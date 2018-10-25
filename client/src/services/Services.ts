
export class Services {

    public getAllItems(): Promise<Array<any>> {

        return new Promise<any>((resolve,reject)=>{

            let url = "http://zoosvc.com/service.svc/GetAllItems";

            fetch(url,
                {
                    method: 'GET',
                    headers: 
                    {
                        'Accept': 'application/json; odata=verbose',
                        'Content-type': 'application/json',
                    }

                }).then(Response => Response.json()).then((data: any) => {
                    resolve(data.GetAllItemsResult);
                }).catch(err => {
                    reject(err);
                });

        });

    }//getItems

}