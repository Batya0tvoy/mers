import { JSDOM } from 'jsdom'

const vinTabsGeneral =  (args: string[]) => {
  return{
    title: args[0],
    data: args[1]
  }
}

const vinAggregates =  (args: string[]) => {
  return{
    type: args[0],
    description: args[1]
  }
}

const vinEquipmentCodes = (args: string[]) => {
  return args.length === 3 ? {
    interiorTrimCode: args[0],
    description: args[1],
    typeCode: args[2],
  } : {
    interiorTrimCode: args[0],
    typeCode: args[1],
  }
  
}

const vinVpds = (args: string[]) => {
  return {
    id: args[0],
    description: args[1]
  }
}

const classes: any = {
  vinTabsGeneral,
  vinAggregates,
  vinEquipmentCodes,
  vinVpds
}

function getData(html: string){
  try { 
    const dom = new JSDOM(html);
    const document = dom.window.document;
 
    const finalArray: object[] = [];

    Array.from(document.querySelectorAll("#vinTabs > div")).forEach(div =>{

      const id:string = div.id;
      const elemsArray: object[] = [];
      
      Array.from(document.querySelectorAll(`#${div.id} > table > tbody > tr`)).forEach(tr =>{
        
        const args: string[] = [];

        Array.from(tr.children).forEach(element => {
            if(element.textContent){
                args.push(element.textContent.replace(/\r?\n?\s{2,}/g, ""));
            }
        })
        
          elemsArray.push(classes[id](args));
        })
    finalArray.push({
      [id]:elemsArray
    })      
    })
  return JSON.stringify(finalArray, null, 2);
  } catch (error){
  console.log(error);
  }

}

export default getData