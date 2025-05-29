import axios from "axios";
import { API_PATH } from "./ApiPath";

export default class PluginApi {
  private apiPath: string = "";
  constructor() {
    this.apiPath = API_PATH + "/api/plugin";
  }

  // TODO: Implement
  createPlugin() {}

  async getPlugins() {
    const res = await axios.get(this.apiPath, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { plugins } = res.data || [];

    return plugins;
  }
}
