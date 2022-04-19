import * as fs from "fs";

export class Ctx {
  lang: string;

  constructor(lang: string) {
    this.lang = lang;
  }

  i18n(key: string): string {
    // just for demo
    return JSON.parse(fs.readFileSync(`./i18n/${this.lang}.json`, "utf-8"))[
      key
    ];
  }
}
