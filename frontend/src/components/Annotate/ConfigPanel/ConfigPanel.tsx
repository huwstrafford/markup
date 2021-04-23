import { useEffect, useState } from "react"
import "./ConfigPanel.css"


type Category = { [category: string]: string[] }

const ATTRIBUTE_CATEGORY = "attributes"
const ENTITY_CATEGORY = "entities"
const ENTITY_COLOUR = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#bcf60c',
  '#fabebe',
  '#008080',
  '#e6beff',
  '#9a6324',
  '#fffac8',
  '#800000',
  '#aaffc3',
  '#808000',
  '#ffd8b1',
  '#000075',
  '#808080',
  '#ffffff',
  '#000000',
]

function ConfigPanel(props: any) {
  const configText = localStorage.getItem("configText")
  const [entities, setEntities] = useState([""])
  const [attributes, setAttributes] = useState([""])
  const [rendered, setRendered] = useState(false)
  const categories = parseCategories(configText)

  useEffect(() => {
    if (rendered) {
      return
    } else if (categories[ENTITY_CATEGORY] && categories[ATTRIBUTE_CATEGORY]) {
      setRendered(true)
      setEntities(categories[ENTITY_CATEGORY])
      setAttributes(categories[ATTRIBUTE_CATEGORY])
    } else {
      props.setErrorMessage("You need to provide a valid config file. Read the docs for more info.")
    }
  }, [props, categories, rendered])

  return (
    <div className="config-panel">
      {entities.map((entity: string, index: number) => {
        return (
          <p className="config-value-row">
            <input
              type="radio"
              id={entity}
              name="entities"
              value={entity}
            />
            <label
              className="config-label"
              style={{ backgroundColor: ENTITY_COLOUR[index] }}
              htmlFor={entity}
            >
              {entity}
            </label>
          </p>
        )
      })}
    </div>
  )
}

function parseCategories(configText: string | null): Category {
  let categoryType = ""
  const categories: Category = {}
  const lines = configText?.split("\n")

  lines?.forEach((line: string) => {
    if (isCategoryType(line)) {
      categoryType = getCategoryType(line)
      categories[categoryType] = []
    } else if (line.trim() !== "") {
      categories[categoryType].push(line)
    }
  })

  return categories
}

function isCategoryType(line: string): boolean {
  if (line.length > 0) {
    return line[0] === "[" && line[line.length - 1] === "]"
  }
  return false
}

function getCategoryType(line: string): string {
  return line.slice(1, line.length - 1)
}

// function parseAttributeValues(attributeSentences) {
//     const attributes = [];
//     const globalAttributes = [];

//     for (let i = 0; i < attributeSentences.length; i++) {
//         // Parse data within attribute sentence
//         const sent = attributeSentences[i];
//         const name = sent.split('Arg:')[0].trim();
//         const entity = sent.split('Arg:')[1].split(',')[0].trim();
//         const values = sent.split('Value:')[1].trim().split('|');

//         // Produce array of global attributes
//         if (entity.toLowerCase() == '<entity>' ) {
//             globalAttributes.push([name, values]);
//             continue;
//         }
//         // Add new attribute
//         attributes.push([name, entity].concat(values));

//         // TODO re-introduce checkbox attribute parsing
//     }
//     // Add global attributes
//     return attributes.concat(parseGlobalAttributes(globalAttributes));
// }

// function parseGlobalAttributes(globalAttributes) {
//     // Add global attributes to each entity
//     const result = [];

//     for (let i = 0; i < entities.length; i++) {
//         for (let j = 0; j < globalAttributes.length; j++) {
//             const name = globalAttributes[j][0];
//             const entity = entities[i];
//             const values = globalAttributes[j][1];
//             result.push([name, entity].concat(values));
//         }
//     }
//     return result;
// }

// function injectEntities() {
//     for (let i = 0; i < entities.length; i++) {
//         const name = entities[i];

//         // Construct input field
//         const row = $('<p/>', {'class': 'config-value-row'});

//         $('<input/>', {
//             'type': 'radio',
//             'id': name + '-radio',
//             'name': 'entities',
//             'value': name + '-radio'
//         }).appendTo(row);

//         $('<label/>', {
//             'colorIndex': i,
//             'class': 'config-label',
//             'for': name + '-radio',
//             'text': name,
//             'css': {
//                 'background-color': colors[i]
//             }
//         }).appendTo(row);

//         // Add entity to config panel
//         $('#entities').append(row);
//     }
//     $('#entities').append('<br>');
// }

// function injectAttributes() {
//     for (let i = 0; i < attributes.length; i++) {
//         const id = attributes[i][0] + attributes[i][1];

//         // Construct input field
//         const row = $('<p/>');

//         $('<input/>', {
//             'type': 'text',
//             'list': id,
//             'placeholder': attributes[i][0],
//             'attribute-for': attributes[i][1],
//             'name': 'values',
//             'class': 'dropdown input-field',
//             'css': {
//                 'display': 'none'
//             }
//         }).appendTo(row);

//         // Populate datalist with attribute options 
//         const datalist = $('<datalist/>', { 'id': id, });
//         for (let j = 2; j < attributes[i].length; j++) {
//             $('<option/>', {
//                 'value': attributes[i][0] + ': ' + attributes[i][j],
//                 'text': attributes[i][j]
//             }).appendTo(datalist);
//         }
//         datalist.appendTo(row);

//         // Add attribute to config panel
//         row.appendTo('#attribute-dropdowns');        
//     }
// }

// function bindConfigEvents() {
//     // Display relevant attributes for selected entity
//     $('input[type=radio]').click(displayAttributes);

//     // Show active entity
//     $('input[type=radio]').click(styleSelectedEntity);
// }


// function displayAttributes() {
//     // Get selected entity
//     const entity = $(this).context.id.substring(0, $(this).context.id.length - 6);

//     // Show relevant attributes
//     $('input[name=values]').hide();
//     $('input[attribute-for="' + entity + '"').show();
//     // TODO add checkboxes
// }

// function styleSelectedEntity() {
//     resetEntityStyle();

//     if (activeEntity == $(this).val()) {
//         // Reset entity and attributes
//         activeEntity = '';
//         $('input[name=values]').val('');
//         $('input[name=values]').hide();
//     } else {
//         // Style active entity
//         activeEntity = $(this).val();    
//         $(this).next().css({
//             marginLeft: '5%',
//             transition : 'margin 300ms'
//         });
//     }
// }

// function resetEntityStyle() {
//     $('.config-label').css({
//         marginLeft: '0',
//         transition : 'margin 300ms'
//     });
// }

export default ConfigPanel
