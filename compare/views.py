from django.shortcuts import render, resolve_url
import re
import operator
#from deepdiff import DeepDiff
from django.http import HttpResponse
import json
from collections import defaultdict

def compare(request):
    return render(request, 'compare.html', {})

def inter_annotator_agreement(request):
    return render(request, 'inter_annotator_agreement.html', {})

## REMOVE CUIPHRASE AS A COMPARISON - FOR WHEN COMPARING TO GATE ANNOTATIONS
## way to get all the possible attributes (similar to how getting all entities is done) - DONE
## get the user to select which ones they want or dont want then - DONE
## send that info to a request to remove the ones that they dont want for the comparison - DONE
## I think create New ann files without the entities they dont want to compare then use already created fuctions - DONE
## Function created that will keep or delete selected entities - Creates dictionary of dictionaries (based of dicAnnotation() function - same output)

def annFiletoArray(annFile):
    '''
    Splits ann file into array with each annotation having one value in the array
    '''
    array = re.split('(T[0-9]{1,4}\t)', annFile) # Split on T2 TAB for start of annotations - and keep what spliting on 
    array.pop(0) # Spilt right at start so first is blank therefore remove
    array = [ x+y for x,y in zip(array[0::2], array[1::2]) ] #join every two elements together (spliting separates them so this repairs that)
    return array
    

def dicAnnotations(annFile):
    '''
    Creates dictionary of dictionary with letters annotations and features in it
    '''
    letterDictionary = {} # create empty dictionary
    for idx, annotations in enumerate(annFile): # enumerate annfile and loop though it
        features = re.split('\n', annotations) # split by \n to get features from each annotation
        if features[-1] == '': # if last feature is blank delete it
            features.pop(-1) # old ann file had empty line at end, not sure if something from old markup or if still occurs from time to time
        i = 0
        annDictionary = {} # dictionary for the annotation
        while i < len(features):
            values =  re.split('\t| ', features[i]) # spilt on tab or space
            if i == 0: # first features will be one with name of annotation + start end point
                annotation = values[1]# name of annotation
                start =  values[2]# start index
                end =  values[3]# end index
                string = values[4]# highlighted string
                annDictionary["AnnotationName"] = annotation #push to annDictionary
                annDictionary["Start"] = start
                annDictionary["End"] = end
                annDictionary["String"] = string
            else: # all others will have features and values
                attribute = values[1] 
                value = values[3]
                annDictionary[attribute] = value
            i += 1 # go to next attribute
        annotaionNum = 'Annotation' + str(idx) #number of the annotaion in the letter (Zero Indexed)
        letterDictionary[annotaionNum] = annDictionary # add annotation to letter Dictionary + then do it all again for next annotation
    return letterDictionary # return the letterDictionary (dictionary of dictionaries)


def SortAnnDictionary(annDic):
    '''
    Sort annotaton dictionary and extract (plus remove) start, end and annotation Name.
    '''
    copyDic = annDic.copy() #copy beacuse otherwise removing from one will remove from other also
    annName = annDic.get('AnnotationName') 
    annStart = int(annDic.get('Start'))
    annEnd = int(annDic.get('End'))
    annString = annDic.get('String')
    copyDic.pop("AnnotationName")
    copyDic.pop("Start")
    copyDic.pop("End")
    copyDic.pop("String")
    copyDic = dict(sorted(copyDic.items(), key=operator.itemgetter(0)))
    return annName, annStart, annEnd, annString, copyDic


def annotations_match(Dic1, Dic2):
    '''
    Get the annotations the have the same name and that overlap (start point of one between start and end of other).
    Will only get annotations from Dic 1, needs to be rerun for annotations from Dic 2 (swap the inputs).
    '''
    matchedDic = {}
    for annNumber, annotation in Dic1.items(): 
        annName1, annStart1, annEnd1, annString1, annDic1 = SortAnnDictionary(annotation)
        for annNumber2, annotation2 in Dic2.items():
            annName2, annStart2, annEnd2, annString2, annDic2 = SortAnnDictionary(annotation2)
            if annName1 == annName2: ## If names of annotations are the same
                if (annStart1 >= annStart2 and annStart1 <= annEnd2) or (annStart2 >= annStart1 and annStart2 <= annEnd1): ## and if start 1 between start2 and end 2 or vice versa 
                    matchedDic[annNumber] = annotation ## add annotation to the matched output
                    break
    return matchedDic


def unmatched_annotations(matched, original):
    '''
    Get annotations that haven't matched from the original dictionary
    '''
    unmatchedDic = {}
    for annNumber, Annotation in original.items():
        if annNumber not in matched: ## if annNumber isn't in matched set then it isn't a match so add to unmatched.....
            unmatchedDic[annNumber] = Annotation
    return unmatchedDic


def sameNumFeatures (dicA, dicB):
    '''
    Gets annotations with the same number of features
    Doesn't check name of features or values
    '''
    sameNumFeatures = {}
    for annNumber, Annotation in dicA.items(): 
        annName1, annStart1, annEnd1, annString1, annDic1 = SortAnnDictionary(Annotation)
        for annNumber2, Annotation2 in dicB.items():
            annName2, annStart2, annEnd2, annString2, annDic2 = SortAnnDictionary(Annotation2)
            if annName1 == annName2: 
                if (annStart1 >= annStart2 and annStart1 <= annEnd2) or (annStart2 >= annStart1 and annStart2 <= annEnd1): #start 1 between start2 and end 2 or vice versa
                    if len(annDic1) == len(annDic2):## if they have the same number of features for annotation then can be outputted
                        sameNumFeatures[annNumber] = Annotation
    return sameNumFeatures


def differentNumFeatures (samenumberFeatures, original):
    '''
    Gets annotations with different number of features (therefore not a match)
    '''
    differentNumFeatures = {}
    for annNumber, Annotation in samenumberFeatures.items():
        if annNumber not in original:## if not in sameNumFeatures then doesn't have same number and therefore can't be a match
            differentNumFeatures[annNumber] = Annotation
    return differentNumFeatures


def sameEverything(dicA, dicB):
    '''
    Gets annotations that have all features with same name and values
    '''
    sameEverything = {}
    for annNumber, Annotation in dicA.items(): 
        annName1, annStart1, annEnd1, annString1, annDic1 = SortAnnDictionary(Annotation)
        for annNumber2, Annotation2 in dicB.items():
            annName2, annStart2, annEnd2, annString2, annDic2 = SortAnnDictionary(Annotation2)
            if annName1 == annName2: 
                if (annStart1 >= annStart2 and annStart1 <= annEnd2) or (annStart2 >= annStart1 and annStart2 <= annEnd1): #start 1 between start2 and end 2 or vice versa
                    if annDic1 == annDic2:## If the dictionaries are idential then its a match
                        sameEverything[annNumber] = Annotation
    return sameEverything


def differentFeatures (sameeverything, original):
    '''
    Gets annotations with different features (therefore not a match)
    '''
    differentFeatures = {}
    for annNumber, annotation in sameeverything.items():
        if annNumber not in original:## if not in sameNumFeatures then doesn't have same number and therefore can't be a match
            differentFeatures[annNumber] = annotation
    return differentFeatures


## this will be used to look at only different annotations in markup
def dicToAnnFile(dic):
    '''
    Returns the dictionary back to an .ann file
    '''
    annFile = "" # Ann file starts empty
    T = 1 #First Annotaion gets T1
    A = 1 # First feature will be A1
    for annNumber, annotation in dic.items(): 
        annName1, annStart1, annEnd1, annString1, annDic1 = SortAnnDictionary(annotation)
        annFile = annFile + "T" + str(T) + "\t" + annName1 + " " + str(annStart1) + " " + str(annEnd1) + "\t" + annString1 + "\n" ## Creates the line for the annotation
        for feature, value in annDic1.items():
            annFile = annFile + "A" + str(A) + "\t" + feature + " " + "T" + str(T) + " " + value + "\n" ## Creates lines for the features of the annotations above
            A = A + 1
        T = T + 1
    return annFile


def precision(TP, FP):
    '''
    Calculate Precision
    '''
    if TP == 0 and FP == 0:
        precision1 = "N/A"
    else:
        precision1 = TP / (TP+FP)
    return round(precision1,4)


def recall(TP, FN):
    '''
    Calculate Recall
    '''
    if TP == 0 and FN == 0:
        recall1 = "N/A"
    else:
        recall1 = TP / (TP+FN)
    return round(recall1,4)


def f1Score(precision, recall):
    '''
    Calculate f1Score
    '''
    if precision == 0 or recall == 0:
        f1Score1 = 0.0
    elif precision == "N/A" or recall == "N/A":
        f1Score1 = "N/A"
    else :
        f1Score1 = (2 * precision * recall)/(precision + recall)
    return round(f1Score1,4)


def getSameEverything(letterDic, letterDic2):
    '''
    Run to get sameEverything output. Input = dictionaries of letters
    '''
    ## Get annotations the match with eachother (match = same name + overlap)
    matchedDic1 = annotations_match(letterDic, letterDic2)
    matchedDic2 = annotations_match(letterDic2, letterDic)

    ## Annotations with same number of features
    sameNumberofFeatues1 = sameNumFeatures(matchedDic1, matchedDic2)
    sameNumberofFeatues2 = sameNumFeatures(matchedDic2, matchedDic1)

    ## Annotations that are identical
    sameEverything1 = sameEverything(sameNumberofFeatues1, sameNumberofFeatues2)
    sameEverything2 = sameEverything(sameNumberofFeatues2, sameNumberofFeatues1)

    return sameEverything1, sameEverything2


def getDifferentAnnotations(letterDic, letterDic2):
    '''
    Run to get differentAnnotations output. Input = dictionaries of letters
    '''
    ## Get annotations the match with eachother (match = same name + overlap)
    matchedDic1 = annotations_match(letterDic, letterDic2)
    matchedDic2 = annotations_match(letterDic2, letterDic)

    ## Annotations with no match
    unmatchedDic1 = unmatched_annotations(matchedDic1, letterDic)
    unmatchedDic2 = unmatched_annotations(matchedDic2, letterDic2)

    ## Annotations with same number of features
    sameNumberofFeatues1 = sameNumFeatures(matchedDic1, matchedDic2)
    sameNumberofFeatues2 = sameNumFeatures(matchedDic2, matchedDic1)

    ## Annotations with different number of features, therefore, not a match.
    differentNumberoffeatures1 = differentNumFeatures(matchedDic1, sameNumberofFeatues1)
    differentNumberoffeatures2 = differentNumFeatures(matchedDic2, sameNumberofFeatues2)

    ## Annotations that are identical
    sameEverything1 = sameEverything(sameNumberofFeatues1, sameNumberofFeatues2)
    sameEverything2 = sameEverything(sameNumberofFeatues2, sameNumberofFeatues1)

    ## Annotations that have different features or values for the features, therefore, not a match.
    differentFeatures1 = differentFeatures(sameNumberofFeatues1, sameEverything1)
    differentFeatures2 = differentFeatures(sameNumberofFeatues2, sameEverything2)

    ## All the annotations that are different 
    differentAnnotations = {}
    differentAnnotations.update(unmatchedDic1) #add unmatchedDic = not same name and overlapping
    differentAnnotations.update(differentNumberoffeatures1) ## diferent number of features 
    differentAnnotations.update(differentFeatures1) ## features are different in someway (name or value)

    ## All the annotations that are different
    differentAnnotations2 = {}
    differentAnnotations2.update(unmatchedDic2)
    differentAnnotations2.update(differentNumberoffeatures2)
    differentAnnotations2.update(differentFeatures2)

    return differentAnnotations, differentAnnotations2


def get_annotations(Dic1, Dic2):
    '''
    Get the annotation names of the annotations in the letter. 
    '''
    annotations = set()
    for annNumber, annotation in Dic1.items(): 
        annName1, annStart1, annEnd1, annString1, annDic1 = SortAnnDictionary(annotation)
        annotations.add(annName1)
    for annNumber2, annotation2 in Dic2.items():
        annName2, annStart2, annEnd2, annString2, annDic2 = SortAnnDictionary(annotation2)
        annotations.add(annName2)
    return annotations


def annotation_unique_dictionaries (annotations, Dic1, Dic2):
    '''
    Creates Dictionaries of lists of Dictionaries that are separated by letter (a or b) and annotation name
    '''
    Let1Dic = {}
    Let2Dic = {}
    for annots in annotations:
        listAnnots1 = {}
        listAnnots2 = {}
        for annNumber, annotation in Dic1.items():
            annName1, annStart1, annEnd1, annString1, annDic1 = SortAnnDictionary(annotation)
            if annots == annName1:
                listAnnots1[annNumber] = annotation
        for annNumber2, annotation2 in Dic2.items():
            annName2, annStart2, annEnd2, annString2, annDic2 = SortAnnDictionary(annotation2)
            if annots == annName2:
                listAnnots2[annNumber2] = annotation2
        Let1Dic.update({annots:listAnnots1})
        Let2Dic.update({annots:listAnnots2})
    return Let1Dic, Let2Dic


def runAll(annFile1, annFile2):
    '''
    Run all the functions to create the output
    Output is the precision, recall and f1Score for one letter that is run
    '''
    ## Can't work out why some are windows end and others aren't, this is a easy fix
    annFile1 = annFile1.replace('\r\n', '\n') 
    annFile2 = annFile2.replace('\r\n', '\n')
    
    ## Create the original dictionary from .ann file
    letterDic = dicAnnotations(annFiletoArray(annFile1))
    letterDic2 = dicAnnotations(annFiletoArray(annFile2))

    sameEverything1, sameEverything2 = getSameEverything(letterDic,letterDic2)

    if len(sameEverything1) == len(sameEverything2):
        TP = len(sameEverything1)
    elif len(sameEverything1) < len(sameEverything2):
        TP = len(sameEverything1)
    else:
        TP = len(sameEverything2)


    FP = len(letterDic2) - TP ## False Positives = number of annotaions that are only in second set i.e. length of second set - length of TP
    FN = len(letterDic) - TP ## False Negatives = number of annotaions that are only in first set i.e. length of first set - length of TP


    if len(letterDic) > 0 and len(letterDic2) > 0: ##
        precision1 = precision(TP, FP)
        recall1 = recall(TP, FN)
    else:
        precision1 = 0
        recall1 = 0

    f1Score1 = f1Score(precision1, recall1)


    results = [precision1, recall1, f1Score1]
    # return precision1, recall1, f1Score1
    return results


def runAll2(letterDic, letterDic2):
    '''
    Run all the functions to create the output
    Output is the precision, recall and f1Score for one letter that is run
    Different input than runAll()
    '''
    sameEverything1, sameEverything2 = getSameEverything(letterDic,letterDic2)

    if len(sameEverything1) == len(sameEverything2):
        TP = len(sameEverything1)
    elif len(sameEverything1) < len(sameEverything2):
        TP = len(sameEverything1)
    else:
        TP = len(sameEverything2)


    FP = len(letterDic2) - TP ## False Positives = number of annotaions that are only in second set i.e. length of second set - length of TP
    FN = len(letterDic) - TP ## False Negatives = number of annotaions that are only in first set i.e. length of first set - length of TP


    if len(letterDic) > 0 and len(letterDic2) > 0: ##
        precision1 = precision(TP, FP)
        recall1 = recall(TP, FN)
    else:
        precision1 = 0
        recall1 = 0

    f1Score1 = f1Score(precision1, recall1)


    results = [precision1, recall1, f1Score1]
    # return precision1, recall1, f1Score1
    return results


def runEverything(request):
    '''
    Run all the functions to create the  precision, recall and f1Score for one letter that is run
    '''
    annFile1 = request.POST['ann1']
    annFile2 = request.POST['ann2']
    ## Can't work out why some are windows end and others aren't, this is a easy fix
    results = runAll(annFile1, annFile2)
    # return precision1, recall1, f1Score1
    return HttpResponse(json.dumps(results))


def runEverything2(request):
    '''
    Run all the functions to create the average f1score for the corpus
    '''
    annFiles1 = request.POST.getlist('annFiles1[]')
    annFiles2 = request.POST.getlist('annFiles2[]')

    overallF1 = []

    for index, x in enumerate(annFiles1):
        annf1 = x
        annf2 = annFiles2[index]
        if (annf1 == "" or annf2 == ""):
            overallF1.append("N/A")
        else :
            results123 = runAll(annf1, annf2)
            overallF1.append(results123[2])


    noNull = [x for x in overallF1 if x != "N/A"]
    average = round(sum(noNull)/len(noNull),4)
    output = [overallF1, average]
    return HttpResponse(json.dumps(output))


def get_f1score_per_annotationCorpusHTML(request):
    '''
    Creates the HTML tables that show f1scores for each entity, whole corpus and per letter
    '''

    annFiles1 = request.POST.getlist('annFiles1[]')
    annFiles2 = request.POST.getlist('annFiles2[]')
    LetterNames = request.POST.getlist('letterNames[]')

    output = defaultdict(list)

    html = "<style> table, th, td {border: 1px solid black;border-collapse: collapse;margin: 5px;}</style>"
    htmlTable1 = "<table><tr><th>LetterNames</th><th>Annotation</th><th>F1Score</th></tr>"

    overallF1perAnnotation = {}

    for index, x in enumerate(annFiles1):
        annf1 = x
        annf2 = annFiles2[index]
        # LetterName = annNames[index]
        if (annf1 == "" or annf2 == ""):
            overallF1perAnnotation[index] = "N/A"
        else :
            annf1 = annf1.replace('\r\n', '\n') 
            annf2 = annf2.replace('\r\n', '\n')
            
            ## Create the original dictionary from .ann file
            letterDic = dicAnnotations(annFiletoArray(annf1))
            letterDic2 = dicAnnotations(annFiletoArray(annf2))

            annotationSet = get_annotations(letterDic, letterDic2)

            annotationSet = list(annotationSet)

            annotationSet.sort()

            let1Dic, let2Dic = annotation_unique_dictionaries(annotationSet, letterDic, letterDic2)

            for annotation in annotationSet:
                if annotation in output:
                    annotation2 = let1Dic.get(annotation)
                    annotation3 = let2Dic.get(annotation)
                    results3 = runAll2(annotation2, annotation3)
                    f1 = results3[2]
                    output[annotation].append(f1)
                    
                else:
                    annotation2 = let1Dic.get(annotation)
                    annotation3 = let2Dic.get(annotation)
                    results2 = runAll2(annotation2, annotation3)
                    f1 = results2[2]
                    output[annotation] = [f1]


            colspan = len(annotationSet)

            for i, annotation in enumerate(annotationSet):
                annotation2 = let1Dic.get(annotation)
                annotation3 = let2Dic.get(annotation)
                results = runAll2(annotation2, annotation3)
                ##output[annotation] = results
                if (i==0):
                    htmlAnnotation = "<tr>\n<th scope='row' rowspan = "+ str(colspan) + ">" + LetterNames[index] + "</th>\n<td>"+ annotation +"</td>\n<td>"+ str(results[2]) +"</td>\n</tr>"
                else:
                    htmlAnnotation = htmlAnnotation + "\n<tr>\n<td>" + annotation +"</td>\n<td>" + str(results[2]) +"</td>\n</tr>"

            
        htmlTable1 = htmlTable1 + "\n" + htmlAnnotation

    htmlTable1 = htmlTable1 + "</table>" 

    avgF1perAnnot = {}

    for annotation in output:
        annotationAVG = round(sum(output[annotation])/len(output[annotation]),4)
        avgF1perAnnot[annotation] = annotationAVG

    annotationAVGSorted = {}

    for i in sorted(avgF1perAnnot):
        annotationAVGSorted[i] = avgF1perAnnot[i]

    htmlOverall = "<table><tr><th>Annotation</th><th>F1Score</th></tr>"
    htmlOverallRow = ""

    for annotation, f1S in annotationAVGSorted.items():
            htmlOverallRow = htmlOverallRow + "<tr>\n<td>"+ annotation +"</td>\n<td>"+ str(f1S) +"</td>\n</tr>\n"

    htmlOverallRow = htmlOverallRow[:-1]

    htmlTable2 = htmlOverall + "\n" + htmlOverallRow + "</table>"
                       
    

    html = html + htmlTable2 + htmlTable1
    return HttpResponse(json.dumps(html))


def getDiffAnnfile(request):
    '''
    Create .ann files that only contain the difference between the two files
    '''
    annFile1 = request.POST['ann1']
    annFile2 = request.POST['ann2']

    ## Can't work out why some are windows end and others aren't, this is a easy fix
    annFile1 = annFile1.replace('\r\n', '\n') 
    annFile2 = annFile2.replace('\r\n', '\n')
    
    ## Create the original dictionary from .ann file
    letterDic = dicAnnotations(annFiletoArray(annFile1))
    letterDic2 = dicAnnotations(annFiletoArray(annFile2))


    differentAnnotations, differentAnnotations2 = getDifferentAnnotations(letterDic, letterDic2)

    diffAnn1 = dicToAnnFile(differentAnnotations)
    diffAnn2 = dicToAnnFile(differentAnnotations2)

    results = [diffAnn1, diffAnn2]

    return HttpResponse(json.dumps(results))


def entities_and_annotations(Dic1, Ent_Annots):
    '''
    Adds entities for each annotation
    '''
    for annNumber, annotation in Dic1.items():
        annName1, annStart1, annEnd1, annString1, annDic1 = SortAnnDictionary(annotation)
        Entities = set()
        for entity in annDic1.keys():
            Entities.add(entity)
        Ent_Annots[annName1].update(Entities)
    return Ent_Annots


def entities_and_annotation_all(request):
    '''
    Creates dictionary of sets that has each Annotation and its feature
    '''
    annFiles1 = request.POST.getlist('annFiles1[]')
    annFiles2 = request.POST.getlist('annFiles2[]')
    AnnotationList = []
    Ent_Annots = {}
    for index, x in enumerate(annFiles1):
        annf1 = x
        annf2 = annFiles2[index]
        # LetterName = annNames[index]
        if (annf1 != "" or annf2 != ""):
            annf1 = annf1.replace('\r\n', '\n') 
            annf2 = annf2.replace('\r\n', '\n')
            
            ## Create the original dictionary from .ann file
            letterDic = dicAnnotations(annFiletoArray(annf1))
            letterDic2 = dicAnnotations(annFiletoArray(annf2))

            annotationSet = get_annotations(letterDic, letterDic2)


        for annotation in annotationSet:
            if annotation not in AnnotationList:
                AnnotationList.append(annotation)
        
    for annot in AnnotationList:
        Ent_Annots[annot] = set()
    
    for index, x in enumerate(annFiles1):
        annf1 = x
        annf2 = annFiles2[index]
        # LetterName = annNames[index]
        if (annf1 != "" or annf2 != ""):
            annf1 = annf1.replace('\r\n', '\n') 
            annf2 = annf2.replace('\r\n', '\n')
            
            ## Create the original dictionary from .ann file
            letterDic = dicAnnotations(annFiletoArray(annf1))
            letterDic2 = dicAnnotations(annFiletoArray(annf2))
 
            Ent_Annots = entities_and_annotations(letterDic, Ent_Annots)
            Ent_Annots = entities_and_annotations(letterDic2, Ent_Annots)
    
    ## convert set to lists in the dic
    Ent_AnnotsList={}

    for annotations, setItems in Ent_Annots.items():
        Ent_AnnotsList[annotations] = list(setItems)
        Ent_AnnotsList[annotations].sort()

    Ent_AnnotsList = dict(sorted(Ent_AnnotsList.items(), key=operator.itemgetter(0)))

    return HttpResponse(json.dumps(Ent_AnnotsList))


def dicWithDelete(annFileArray, RemovedFeatures):
    '''
    Create a dictionary of the annFile.
    Removes the entites are not wanted.
    '''
    newDictionary = {}
    for idx, annotations in enumerate(annFileArray): # enumerate annfile and loop though it
        features = re.split('\n', annotations) # split by \n to get features from each annotation
        if features[-1] == '': # if last feature is blank delete it
            features.pop(-1) # old ann file had empty line at end, not sure if something from old markup or if still occurs from time to time
        i = 0
        annDictionary = {}
        while i < len(features):
            values =  re.split('\t| ', features[i]) # spilt on tab or space
            #print(values)
            if i == 0: # first features will be one with name of annotation + start end point
                annotation = values[1]# name of annotation
                start =  values[2]# start index
                end =  values[3]# end index
                string = values[4]# highlighted string
                annDictionary["AnnotationName"] = annotation #push to annDictionary
                annDictionary["Start"] = start
                annDictionary["End"] = end
                annDictionary["String"] = string
            else: # all others will have features and values
                toDelete = RemovedFeatures[annotation]
                attribute = values[1]
                if attribute not in toDelete: ## only add if feature is not in list of stuff to delete
                    attribute = values[1] 
                    value = values[3]
                    annDictionary[attribute] = value
            i += 1 # go to next attribute
        annotaionNum = 'Annotation' + str(idx) #number of the annotaion in the letter (Zero Indexed)
        newDictionary[annotaionNum] = annDictionary # add annotation to letter Dictionary + then do it all again for next annotation
    return newDictionary # return the letterDictionary (dictionary of dictionaries)


def dicWithKeep(annFileArray, KeepFeatures):
    '''
    Only keeps entities that you want from the KeepFeature dictionary of lists
    '''
    newDictionary = {}
    for idx, annotations in enumerate(annFileArray): # enumerate annfile and loop though it
        features = re.split('\n', annotations) # split by \n to get features from each annotation
        if features[-1] == '': # if last feature is blank delete it
            features.pop(-1) # old ann file had empty line at end, not sure if something from old markup or if still occurs from time to time
        i = 0
        annDictionary = {}
        while i < len(features):
            values =  re.split('\t| ', features[i]) # spilt on tab or space
            #print(values)
            if i == 0: # first features will be one with name of annotation + start end point
                annotation = values[1]# name of annotation
                start =  values[2]# start index
                end =  values[3]# end index
                string = values[4]# highlighted string
                annDictionary["AnnotationName"] = annotation #push to annDictionary
                annDictionary["Start"] = start
                annDictionary["End"] = end
                annDictionary["String"] = string
            else: # all others will have features and values
                toKeep = KeepFeatures[annotation]
                attribute = values[1]
                if attribute in toKeep:
                    attribute = values[1] 
                    value = values[3]
                    annDictionary[attribute] = value
            i += 1 # go to next attribute
        annotaionNum = 'Annotation' + str(idx) #number of the annotaion in the letter (Zero Indexed)
        newDictionary[annotaionNum] = annDictionary # add annotation to letter Dictionary + then do it all again for next annotation
    return newDictionary # return the letterDictionary (dictionary of dictionaries)


def findOutDifferences(letterDic, letterDic2):
    '''
    Will create output that shows what the differences between the unmatched annotations are
    '''
    differentAnnotations, differentAnnotations2 = getDifferentAnnotations(letterDic, letterDic2)
    differenceFeatuesA = {}
    differentValuesA = {}
    differenceFeatuesB = {}
    differentValuesB = {}
    differentAnnotationA = {}
    differentAnnotationB = {}
    for annNumber, annotation in differentAnnotations.items():
        annName1, annStart1, annEnd1, annString1, featValues = SortAnnDictionary(annotation)
        for annNumber2, annotation2 in differentAnnotations2.items():
            annName2, annStart2, annEnd2, annString2, featValues2 = SortAnnDictionary(annotation2)
            if annName1 == annName2:#same name
                if (annStart1 >= annStart2 and annStart1 <= annEnd2) or (annStart2 >= annStart1 and annStart2 <= annEnd1):#overlapping
                    for feature, value in featValues.items():
                        if feature not in featValues2.keys():
                            if annNumber not in differenceFeatuesA.keys():
                                differenceFeatuesA[annNumber] = feature
                            else:
                                oldVal = differenceFeatuesA[annNumber]
                                differenceFeatuesA[annNumber] = oldVal + "-" + feature
                        if feature in featValues2.keys() and value != featValues2[feature]:
                            if annNumber not in differentValuesA.keys():
                                differentValuesA[annNumber] = feature + ":" + value
                            else:
                                oldVal = differentValuesA[annNumber]
                                differentValuesA[annNumber] = oldVal + "-" + feature + ":" + value


    for annNumber, annotation in differentAnnotations2.items():
        annName1, annStart1, annEnd1, annString1, featValues = SortAnnDictionary(annotation)
        for annNumber2, annotation2 in differentAnnotations.items():
            annName2, annStart2, annEnd2, annString2, featValues2 = SortAnnDictionary(annotation2)
            if annName1 == annName2:#same name
                if (annStart1 >= annStart2 and annStart1 <= annEnd2) or (annStart2 >= annStart1 and annStart2 <= annEnd1):#overlapping
                    for feature, value in featValues.items():
                        if feature not in featValues2.keys():
                            if annNumber not in differenceFeatuesB.keys():
                                differenceFeatuesB[annNumber] = feature
                            else:
                                oldVal = differenceFeatuesB[annNumber]
                                differenceFeatuesB[annNumber] = oldVal + "-" + feature
                        if feature in featValues2.keys() and value != featValues2[feature]:
                            if annNumber not in differentValuesB.keys():
                                differentValuesB[annNumber] = feature + ":" + value
                            else:
                                oldVal = differentValuesB[annNumber]
                                differentValuesB[annNumber] = oldVal + "-" + feature + ":" + value
    ## Annotations with no match are created in getDifferentAnnotations() function, but they all get pushed together before the output
    ## Could change (also need to change one other function getDiffAnnFiles()) but should be okay

    return differenceFeatuesA, differenceFeatuesB, differentValuesA, differentValuesB


def runAllWithRemove(annFile1, annFile2):
    '''
    Run all the functions to create the output
    Output is the precision, recall and f1Score for one letter that is run
    '''
    RemovedFeatures = {'Diagnosis':['CUIPhrase'], 'WhenDiagnosed':['CUIPhrase'], 'Onset':['CUIPhrase'], 'EpilepsyCause':['CUIPhrase'], 'SeizureFrequency':['CUIPhrase'],'Investigations':['CUIPhrase'],'Prescription':['CUIPhrase', 'DrugName'],'PatientHistory':['CUIPhrase'],'BirthHistory':['CUIPhrase']}
    
    ## Can't work out why some are windows end and others aren't, this is a easy fix
    annFile1 = annFile1.replace('\r\n', '\n') 
    annFile2 = annFile2.replace('\r\n', '\n')
    
    ## Create the original dictionary from .ann file
    letterDic = dicAnnotations(annFiletoArray(annFile1))
    letterDic2 = dicAnnotations(annFiletoArray(annFile2))

    sameEverything1, sameEverything2 = getSameEverythingWithRemove(letterDic,letterDic2, RemovedFeatures)

    if len(sameEverything1) == len(sameEverything2):
        TP = len(sameEverything1)
    elif len(sameEverything1) < len(sameEverything2):
        TP = len(sameEverything1)
    else:
        TP = len(sameEverything2)


    FP = len(letterDic2) - TP ## False Positives = number of annotaions that are only in second set i.e. length of second set - length of TP
    FN = len(letterDic) - TP ## False Negatives = number of annotaions that are only in first set i.e. length of first set - length of TP


    if len(letterDic) > 0 and len(letterDic2) > 0: ##
        precision1 = precision(TP, FP)
        recall1 = recall(TP, FN)
    else:
        precision1 = 0
        recall1 = 0

    f1Score1 = f1Score(precision1, recall1)


    results = [precision1, recall1, f1Score1]
    # return precision1, recall1, f1Score1
    return results


def runEverythingWithRemove(request):
    '''
    Run all the functions to create the  precision, recall and f1Score for one letter that is run
    '''

    annFile1 = request.POST['ann1']
    annFile2 = request.POST['ann2']
    ## Can't work out why some are windows end and others aren't, this is a easy fix
    results = runAllWithRemove(annFile1, annFile2)
    # return precision1, recall1, f1Score1
    return HttpResponse(json.dumps(results))


def runEverything2WithRemove(request):
    '''
    Run all the functions to create the average f1score for the corpus
    '''
    annFiles1 = request.POST.getlist('annFiles1[]')
    annFiles2 = request.POST.getlist('annFiles2[]')

    overallF1 = []

    for index, x in enumerate(annFiles1):
        annf1 = x
        annf2 = annFiles2[index]
        if (annf1 == "" or annf2 == ""):
            overallF1.append("N/A")
        else :
            results123 = runAllWithRemove(annf1, annf2)
            overallF1.append(results123[2])


    noNull = [x for x in overallF1 if x != "N/A"]
    average = round(sum(noNull)/len(noNull),4)
    output = [overallF1, average]
    return HttpResponse(json.dumps(output))


def removeIdenticalAnnots(Dic1):
    ## If all all keys and all values are identical then remove the second annotation - create either new ann or new dictionary without repeats
    ## Will then need to think about comaparing two annots and ignoring the start and end points

    ## Would work well with SortedAnnDicRemove/Keep() also
    Dic1Copy = Dic1.copy()
    IdenticalAnnots = {}
    for annNumber, annotation in Dic1.items():
        annName1, annStart1, annEnd1, annString1, featValues = SortAnnDictionary(annotation)
        for annNumber2, annotation2 in Dic1.items():
            annName2, annStart2, annEnd2, annString2, featValues2 = SortAnnDictionary(annotation2)
            if annName1 == annName2 and annStart1 != annStart2 and annEnd1 != annEnd2 and featValues == featValues2:
                ## Identical annotation apart from start and end
                if annNumber not in IdenticalAnnots:
                    IdenticalAnnots[annNumber] = [annNumber2]
                else:
                    IdenticalAnnots[annNumber].append(annNumber2)

    
    for orig, twins in IdenticalAnnots.items():
        annNameOrig, annStartOrig, annEndOrig, annStringOrig, featValuesOrig = SortAnnDictionary(Dic1[orig])
        for twin in twins:
            annNameTwin, annStartTwin, annEndTwin, annStringTwin, featValuesTwin = SortAnnDictionary(Dic1[twin])
            if annStartOrig > annStartTwin:
                Dic1Copy.pop(orig)
                break
            elif annStartOrig == annStartTwin and annEndOrig > annEndTwin:
                Dic1Copy.pop(orig)
                break
    
    ## Dic1Copy is the one without IdentcalAnnots
    return Dic1, Dic1Copy, IdenticalAnnots


def SortAnnDictionarywithRemove(annDic,RemovedFeatures):
    '''
    Sort annotaton dictionary and extract (plus remove) start, end and annotation Name.
    This will also allow upload of a list of features to remove/ignore from further analysis
    Format of Removed Feature = "{AnnotationName:[List, Of, Features], Diagnosis:[ListOfFeaturesToDelete], SeizureFreq:[list]..}
    '''
    copyDic = annDic.copy() #copy beacuse otherwise removing from one will remove from other also
    annName = annDic.get('AnnotationName') 
    annStart = int(annDic.get('Start'))
    annEnd = int(annDic.get('End'))
    annString = annDic.get('String')
    copyDic.pop("AnnotationName")
    copyDic.pop("Start")
    copyDic.pop("End")
    copyDic.pop("String")
    listRemove = RemovedFeatures[annName]
    for x in listRemove:
        if x in copyDic.keys():
            copyDic.pop(x)
    copyDic = dict(sorted(copyDic.items(), key=operator.itemgetter(0)))
    return annName, annStart, annEnd, annString, copyDic


def SortAnnDictionarywithKeep(annDic,KeepFeatures):
    '''
    Sort annotaton dictionary and extract (plus remove) start, end and annotation Name.
    This will also allow upload of a list of features to Keep for further analysis
    '''
    copyDic = annDic.copy() #copy beacuse otherwise removing from one will remove from other also
    annName = annDic.get('AnnotationName') 
    annStart = int(annDic.get('Start'))
    annEnd = int(annDic.get('End'))
    annString = annDic.get('String')
    copyDic.pop("AnnotationName")
    copyDic.pop("Start")
    copyDic.pop("End")
    copyDic.pop("String")
    listKeep = KeepFeatures[annName]
    for x in listKeep:
        if x not in copyDic.keys():
            copyDic.pop(x)
    copyDic = dict(sorted(copyDic.items(), key=operator.itemgetter(0)))
    return annName, annStart, annEnd, annString, copyDic


def annotations_matchWithRemove(Dic1, Dic2, RemovedFeatures):
    '''
    Get the annotations the have the same name and that overlap (start point of one between start and end of other).
    Will only get annotations from Dic 1, needs to be rerun for annotations from Dic 2 (swap the inputs).
    '''
    ##RemovedFeatures = {'Diagnosis':['CUIPhrase'], 'WhenDiagnosed':['CUIPhrase'], 'Onset':['CUIPhrase'], 'EpilepsyCause':['CUIPhrase'], 'SeizureFrequency':['CUIPhrase'],'Investigations':['CUIPhrase'],'Prescription':['CUIPhrase'],'PatientHistory':['CUIPhrase'],'PatientHistory':['CUIPhrase']}
    matchedDic = {}
    for annNumber, annotation in Dic1.items(): 
        annName1, annStart1, annEnd1, annString1, annDic1 = SortAnnDictionarywithRemove(annotation, RemovedFeatures)
        for annNumber2, annotation2 in Dic2.items():
            annName2, annStart2, annEnd2, annString2, annDic2 = SortAnnDictionarywithRemove(annotation2, RemovedFeatures)
            if annName1 == annName2: ## If names of annotations are the same
                if (annStart1 >= annStart2 and annStart1 <= annEnd2) or (annStart2 >= annStart1 and annStart2 <= annEnd1): ## and if start 1 between start2 and end 2 or vice versa 
                    matchedDic[annNumber] = annotation ## add annotation to the matched output
                    break
    return matchedDic


def sameNumFeaturesWithRemove (dicA, dicB, RemovedFeatures):
    '''
    Gets annotations with the same number of features
    Doesn't check name of features or values
    '''
    sameNumFeatures = {}
    for annNumber, Annotation in dicA.items(): 
        annName1, annStart1, annEnd1, annString1, annDic1 = SortAnnDictionarywithRemove(Annotation, RemovedFeatures)
        for annNumber2, Annotation2 in dicB.items():
            annName2, annStart2, annEnd2, annString2, annDic2 = SortAnnDictionarywithRemove(Annotation2, RemovedFeatures)
            if annName1 == annName2: 
                if (annStart1 >= annStart2 and annStart1 <= annEnd2) or (annStart2 >= annStart1 and annStart2 <= annEnd1): #start 1 between start2 and end 2 or vice versa
                    if len(annDic1) == len(annDic2):## if they have the same number of features for annotation then can be outputted
                        sameNumFeatures[annNumber] = Annotation
    return sameNumFeatures


def sameEverythingWithRemove(dicA, dicB, RemovedFeatures):
    '''
    Gets annotations that have all features with same name and values
    '''
    sameEverything = {}
    for annNumber, Annotation in dicA.items(): 
        annName1, annStart1, annEnd1, annString1, annDic1 = SortAnnDictionarywithRemove(Annotation, RemovedFeatures)
        for annNumber2, Annotation2 in dicB.items():
            annName2, annStart2, annEnd2, annString2, annDic2 = SortAnnDictionarywithRemove(Annotation2, RemovedFeatures)
            if annName1 == annName2: 
                if (annStart1 >= annStart2 and annStart1 <= annEnd2) or (annStart2 >= annStart1 and annStart2 <= annEnd1): #start 1 between start2 and end 2 or vice versa
                    if annDic1 == annDic2:## If the dictionaries are idential then its a match
                        sameEverything[annNumber] = Annotation
    return sameEverything


def getDifferentAnnotationsWithRemove(letterDic, letterDic2):
    '''
    Run to get differentAnnotations output. Input = dictionaries of letters
    '''
    RemovedFeatures = {'Diagnosis':['CUIPhrase'], 'WhenDiagnosed':['CUIPhrase'], 'Onset':['CUIPhrase'], 'EpilepsyCause':['CUIPhrase'], 'SeizureFrequency':['CUIPhrase'],'Investigations':['CUIPhrase'],'Prescription':['CUIPhrase', 'DrugName'],'PatientHistory':['CUIPhrase'],'BirthHistory':['CUIPhrase']}

    ## Get annotations the match with eachother (match = same name + overlap)
    matchedDic1 = annotations_matchWithRemove(letterDic, letterDic2, RemovedFeatures)
    matchedDic2 = annotations_matchWithRemove(letterDic2, letterDic, RemovedFeatures)

    ## Annotations with no match
    unmatchedDic1 = unmatched_annotations(matchedDic1, letterDic)
    unmatchedDic2 = unmatched_annotations(matchedDic2, letterDic2)

    ## Annotations with same number of features
    sameNumberofFeatues1 = sameNumFeaturesWithRemove(matchedDic1, matchedDic2, RemovedFeatures)
    sameNumberofFeatues2 = sameNumFeaturesWithRemove(matchedDic2, matchedDic1, RemovedFeatures)

    ## Annotations with different number of features, therefore, not a match.
    differentNumberoffeatures1 = differentNumFeatures(matchedDic1, sameNumberofFeatues1)
    differentNumberoffeatures2 = differentNumFeatures(matchedDic2, sameNumberofFeatues2)

    ## Annotations that are identical
    sameEverything1 = sameEverythingWithRemove(sameNumberofFeatues1, sameNumberofFeatues2, RemovedFeatures)
    sameEverything2 = sameEverythingWithRemove(sameNumberofFeatues2, sameNumberofFeatues1, RemovedFeatures)

    ## Annotations that have different features or values for the features, therefore, not a match.
    differentFeatures1 = differentFeatures(sameNumberofFeatues1, sameEverything1)
    differentFeatures2 = differentFeatures(sameNumberofFeatues2, sameEverything2)

    ## All the annotations that are different 
    differentAnnotations = {}
    differentAnnotations.update(unmatchedDic1) #add unmatchedDic = not same name and overlapping
    differentAnnotations.update(differentNumberoffeatures1) ## diferent number of features 
    differentAnnotations.update(differentFeatures1) ## features are different in someway (name or value)

    ## All the annotations that are different
    differentAnnotations2 = {}
    differentAnnotations2.update(unmatchedDic2)
    differentAnnotations2.update(differentNumberoffeatures2)
    differentAnnotations2.update(differentFeatures2)

    return differentAnnotations, differentAnnotations2


def getDiffAnnfileWithRemove(request):
    '''
    Create .ann files that only contain the difference between the two files
    '''
    annFile1 = request.POST['ann1']
    annFile2 = request.POST['ann2']

    ## Can't work out why some are windows end and others aren't, this is a easy fix
    annFile1 = annFile1.replace('\r\n', '\n') 
    annFile2 = annFile2.replace('\r\n', '\n')
    
    ## Create the original dictionary from .ann file
    letterDic = dicAnnotations(annFiletoArray(annFile1))
    letterDic2 = dicAnnotations(annFiletoArray(annFile2))


    differentAnnotations, differentAnnotations2 = getDifferentAnnotationsWithRemove(letterDic, letterDic2)

    diffAnn1 = dicToAnnFile(differentAnnotations)
    diffAnn2 = dicToAnnFile(differentAnnotations2)

    results = [diffAnn1, diffAnn2]

    return HttpResponse(json.dumps(results))


def getSameEverythingWithRemove(letterDic, letterDic2, RemovedFeatures):
    '''
    Run to get sameEverything output. Input = dictionaries of letters
    '''
    ## Get annotations the match with eachother (match = same name + overlap)
    matchedDic1 = annotations_matchWithRemove(letterDic, letterDic2, RemovedFeatures)
    matchedDic2 = annotations_matchWithRemove(letterDic2, letterDic, RemovedFeatures)

    ## Annotations with same number of features
    sameNumberofFeatues1 = sameNumFeaturesWithRemove(matchedDic1, matchedDic2, RemovedFeatures)
    sameNumberofFeatues2 = sameNumFeaturesWithRemove(matchedDic2, matchedDic1, RemovedFeatures)

    ## Annotations that are identical
    sameEverything1 = sameEverythingWithRemove(sameNumberofFeatues1, sameNumberofFeatues2, RemovedFeatures)
    sameEverything2 = sameEverythingWithRemove(sameNumberofFeatues2, sameNumberofFeatues1, RemovedFeatures)

    return sameEverything1, sameEverything2


def runAll2WithRemove(letterDic, letterDic2):
    '''
    Run all the functions to create the output
    Output is the precision, recall and f1Score for one letter that is run
    Different input than runAll()
    '''
    RemovedFeatures = {'Diagnosis':['CUIPhrase'], 'WhenDiagnosed':['CUIPhrase'], 'Onset':['CUIPhrase'], 'EpilepsyCause':['CUIPhrase'], 'SeizureFrequency':['CUIPhrase'],'Investigations':['CUIPhrase'],'Prescription':['CUIPhrase', 'DrugName'],'PatientHistory':['CUIPhrase'],'BirthHistory':['CUIPhrase']}
    
    sameEverything1, sameEverything2 = getSameEverythingWithRemove(letterDic,letterDic2, RemovedFeatures)

    if len(sameEverything1) == len(sameEverything2):
        TP = len(sameEverything1)
    elif len(sameEverything1) < len(sameEverything2):
        TP = len(sameEverything1)
    else:
        TP = len(sameEverything2)


    FP = len(letterDic2) - TP ## False Positives = number of annotaions that are only in second set i.e. length of second set - length of TP
    FN = len(letterDic) - TP ## False Negatives = number of annotaions that are only in first set i.e. length of first set - length of TP


    if len(letterDic) > 0 and len(letterDic2) > 0: ##
        precision1 = precision(TP, FP)
        recall1 = recall(TP, FN)
    else:
        precision1 = 0
        recall1 = 0

    f1Score1 = f1Score(precision1, recall1)


    results = [precision1, recall1, f1Score1]
    # return precision1, recall1, f1Score1
    return results


def get_f1score_per_annotationCorpusHTMLWithRemove(request):
    '''
    Creates the HTML tables that show f1scores for each entity, whole corpus and per letter
    '''

    annFiles1 = request.POST.getlist('annFiles1[]')
    annFiles2 = request.POST.getlist('annFiles2[]')
    LetterNames = request.POST.getlist('letterNames[]')

    output = defaultdict(list)

    html = "<style> table, th, td {border: 1px solid black;border-collapse: collapse;margin: 5px;}</style>"
    htmlTable1 = "<table><tr><th>LetterNames</th><th>Annotation</th><th>F1Score</th></tr>"

    overallF1perAnnotation = {}

    for index, x in enumerate(annFiles1):
        annf1 = x
        annf2 = annFiles2[index]
        # LetterName = annNames[index]
        if (annf1 == "" or annf2 == ""):
            overallF1perAnnotation[index] = "N/A"
        else :
            annf1 = annf1.replace('\r\n', '\n') 
            annf2 = annf2.replace('\r\n', '\n')
            
            ## Create the original dictionary from .ann file
            letterDic = dicAnnotations(annFiletoArray(annf1))
            letterDic2 = dicAnnotations(annFiletoArray(annf2))

            annotationSet = get_annotations(letterDic, letterDic2)

            annotationSet = list(annotationSet)

            annotationSet.sort()

            let1Dic, let2Dic = annotation_unique_dictionaries(annotationSet, letterDic, letterDic2)

            for annotation in annotationSet:
                if annotation in output:
                    annotation2 = let1Dic.get(annotation)
                    annotation3 = let2Dic.get(annotation)
                    results3 = runAll2WithRemove(annotation2, annotation3)
                    f1 = results3[2]
                    output[annotation].append(f1)
                    
                else:
                    annotation2 = let1Dic.get(annotation)
                    annotation3 = let2Dic.get(annotation)
                    results2 = runAll2WithRemove(annotation2, annotation3)
                    f1 = results2[2]
                    output[annotation] = [f1]


            colspan = len(annotationSet)

            for i, annotation in enumerate(annotationSet):
                annotation2 = let1Dic.get(annotation)
                annotation3 = let2Dic.get(annotation)
                results = runAll2WithRemove(annotation2, annotation3)
                ##output[annotation] = results
                if (i==0):
                    htmlAnnotation = "<tr>\n<th scope='row' rowspan = "+ str(colspan) + ">" + LetterNames[index] + "</th>\n<td>"+ annotation +"</td>\n<td>"+ str(results[2]) +"</td>\n</tr>"
                else:
                    htmlAnnotation = htmlAnnotation + "\n<tr>\n<td>" + annotation +"</td>\n<td>" + str(results[2]) +"</td>\n</tr>"

            
        htmlTable1 = htmlTable1 + "\n" + htmlAnnotation

    htmlTable1 = htmlTable1 + "</table>" 

    avgF1perAnnot = {}

    for annotation in output:
        annotationAVG = round(sum(output[annotation])/len(output[annotation]),4)
        avgF1perAnnot[annotation] = annotationAVG

    annotationAVGSorted = {}

    for i in sorted(avgF1perAnnot):
        annotationAVGSorted[i] = avgF1perAnnot[i]

    htmlOverall = "<table><tr><th>Annotation</th><th>F1Score</th></tr>"
    htmlOverallRow = ""

    for annotation, f1S in annotationAVGSorted.items():
            htmlOverallRow = htmlOverallRow + "<tr>\n<td>"+ annotation +"</td>\n<td>"+ str(f1S) +"</td>\n</tr>\n"

    htmlOverallRow = htmlOverallRow[:-1]

    htmlTable2 = htmlOverall + "\n" + htmlOverallRow + "</table>"
                       
    

    html = html + htmlTable2 + htmlTable1
    return HttpResponse(json.dumps(html))