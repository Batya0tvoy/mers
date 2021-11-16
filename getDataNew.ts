import { JSDOM } from 'jsdom'

const generateVinTabsObj = (keys: string[], data: string[]) => {
    const obj: any = {};
    for (let index = 0; index < keys.length; index++) {
      if(data[index]){
        const key = keys[index];
        obj[key] = data[index];
      }
    }
    return obj;
}

function getData(html: string){
  try { 
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let finalJson: any = {};

    Array.from(document.querySelectorAll("#vinTabs > div")).forEach(div =>{

      const id:string = div.id;
      const elemsArray: object[] = [];
      const keys: string[] = [];

      Array.from(document.querySelectorAll(`#${div.id} > table > thead > tr > th`)).forEach(th =>{
          if(th.textContent && th.textContent.trim()){
              keys.push(th.textContent);
          }
          
      })

      Array.from(document.querySelectorAll(`#${div.id} > table > tbody > tr`)).forEach(tr =>{
        const args: string[] = [];

        Array.from(tr.children).forEach(element => {
            if(element.textContent && element.textContent.trim()){
                args.push(element.textContent.replace(/\r?\n?\s{2,}/g, ""));
            }else{
              args.push("");
            }
        })
        if(args[0]){
          if(keys.length){
            elemsArray.push(generateVinTabsObj(keys, args))
          }else{
            elemsArray.push(generateVinTabsObj(["title", "data"], args.slice(0, 2)));
            if(args[2]){
              elemsArray.push(generateVinTabsObj(["title", "data"], args.slice(2)));
            }
        
        }
      }
      })
        finalJson[id] = elemsArray;
    })
  console.log(JSON.stringify(finalJson, null, 2));
  } catch (error){
  console.log(error);
  }

}

export default getData
