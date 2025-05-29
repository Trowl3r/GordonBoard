// TODO: Create this into an API class
export const API_PATH = "http://localhost:8000";
const API_URL = API_PATH + "/api/plugin";

export function getWidgetAdress(src: string) {
    return API_URL + src + "/widget.html";
}

export function getPluginAddress(src: string) {
    return API_URL + src + "/plugin.js" 
}