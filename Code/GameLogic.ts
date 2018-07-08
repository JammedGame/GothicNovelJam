export { GameLogic };

import * as TBX from "engineer-js";

import { SoundManager } from "./SoundManager";
import { MenuScene } from "./UIScenes/MenuScene";
import { SettingsScene } from "./UIScenes/SettingsScene";
import { CreditsScene } from "./UIScenes/CreditsScene";
import { LoadingScene } from "./UIScenes/LoadingScene";

class GameLogic
{
    private _Game:TBX.Game;
    private _Runner:TBX.Runner;
    public constructor(Old?:GameLogic)
    {
        if(Old)
        {
            //TODO
        }
        else
        {
            this.Init();
        }
    }
    private Init() : void
    {
        TBX.Settings.GlobalFontFamily = "Segoe UI";
        if(window.location.href.indexOf("itch.io") != -1)
        {
            TBX.Settings.GlobalFontScale = 0.67;
        }
        this._Game = new TBX.Game();
        this._Game.Name = "Gothic Novel Jam";
        let SM:SoundManager = new SoundManager();
        this._Runner = new TBX.Runner(this._Game, TBX.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0));
        this._Game.Attach(new MenuScene());
        this._Game.Attach(new SettingsScene());
        this._Game.Attach(new CreditsScene());
        this._Game.Attach(new LoadingScene());
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Loading");
        this._Runner.Run();
    }
}