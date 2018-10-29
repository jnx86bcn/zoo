
export class Services {

    public static getAllItems(): Promise<Array<any>> {

        return new Promise<any>((resolve,reject)=>{

            let url = "http://zoosvc.com/service.svc/GetAllItems";

            fetch(url,{

                    method: 'GET',
                    headers: {'Accept': 'application/json; odata=verbose','Content-type': 'application/json'}

                }).then(Response => Response.json()).then((data: any) => {
                    resolve(data.GetAllItemsResult);
                }).catch(err => {
                    reject(err);
            });

        });

    }//getItems


    public static addItem(item: any): Promise<any> {

        let json = JSON.stringify({ item })

        return new Promise<any>((resolve,reject)=>{

            let url = "http://zoosvc.com/service.svc/AddItem";

            fetch(url,{

                    method: 'POST',
                    headers: {'Accept': 'application/json; odata=verbose','Content-type': 'application/json'},
                    body: JSON.stringify("{"+json.split("{")[2].split("}")[0]+"}")

                }).then(Response => Response.json()).then((data: any) => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
            });

        });

    }//addItem

}