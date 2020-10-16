import lib from "swf-lib";
import { Level } from "./Level";
import { PopSpikes } from "./PopSpikes";
import { Teleporter } from "./Teleporter";
import { SoundBox } from "./john/SoundBox";
import { TickerWord } from "./TickerWord";

export class Level9 extends Level {
  public declare cautionSign: lib.flash.display.MovieClip;

  public declare p1: PopSpikes;

  public declare p10: PopSpikes;

  public declare p11: PopSpikes;

  public declare p12: PopSpikes;

  public declare p13: PopSpikes;

  public declare p14: PopSpikes;

  public declare p15: PopSpikes;

  public declare p16: PopSpikes;

  public declare p17: PopSpikes;

  public declare p18: PopSpikes;

  public declare p19: PopSpikes;

  public declare p2: PopSpikes;

  public declare p20: PopSpikes;

  public declare p21: PopSpikes;

  public declare p22: PopSpikes;

  public declare p23: PopSpikes;

  public declare p24: PopSpikes;

  public declare p25: PopSpikes;

  public declare p26: PopSpikes;

  public declare p27: PopSpikes;

  public declare p28: PopSpikes;

  public declare p29: PopSpikes;

  public declare p3: PopSpikes;

  public declare p30: PopSpikes;

  public declare p31: PopSpikes;

  public declare p32: PopSpikes;

  public declare p33: PopSpikes;

  public declare p34: PopSpikes;

  public declare p35: PopSpikes;

  public declare p36: PopSpikes;

  public declare p37: PopSpikes;

  public declare p38: PopSpikes;

  public declare p39: PopSpikes;

  public declare p4: PopSpikes;

  public declare p40: PopSpikes;

  public declare p41: PopSpikes;

  public declare p42: PopSpikes;

  public declare p43: PopSpikes;

  public declare p45: PopSpikes;

  public declare p47: PopSpikes;

  public declare p5: PopSpikes;

  public declare p6: PopSpikes;

  public declare p7: PopSpikes;

  public declare p8: PopSpikes;

  public declare p9: PopSpikes;

  public declare sign: lib.flash.display.MovieClipT<{
    TICKERAB: TickerWord;
  }>;

  public declare ta1: Teleporter;

  public declare ta2: Teleporter;

  public declare triggeredLight: boolean;

  public constructor() {
    super();
    this.triggeredLight = false;
  }

  public uniqueLevelInit(): any {
    this.sign.TICKERAB.changeString(this.parent["playerObject"].gameName);
    this.addChild(this.sign);
  }

  public uniqueLevelPing(): any {
    if (!this.triggeredLight) {
      if (this.player.x > 1775) {
        this.triggeredLight = true;
        SoundBox.playSound("Cheer2");
        SoundBox.playSound("Cheer");
      }
    }
  }
}
