import { LoginPage } from "./LoginPage.js";

export class PageFactory {
  static getPage(pageName, page) {
    switch (pageName) {
      case "login":
        return new LoginPage(page);
      default:
        throw new Error("Unknown page");
    }
  }
}