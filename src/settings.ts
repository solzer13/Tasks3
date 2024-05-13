
const SETTINGS_KEY = "settings";

export class Settings {
    server: string = "";
    token: string = "";

    constructor() {
        let data = localStorage.getItem(SETTINGS_KEY);
    
        if(data){
            let json: any = JSON.parse(data);
            
            this.server = json.server ?? "";
            this.token = json.token ?? "";
        }
    }
    
    public save(){
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(this));
    }
}