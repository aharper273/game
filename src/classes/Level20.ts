import lib from "swf-lib";
import { Level } from "./Level";

export class Level20 extends Level {
  public declare cautionSign: lib.flash.display.MovieClip;

  public constructor() {
    super();
  }

  public uniqueLevelInit(): any {}

  public uniqueLevelPing(): any {}
}
