export { LoadingScene }

import * as TBX from "engineer-js";

import { World } from "./../Data/World";
import { UIScene } from "./UIScene";
import { MenuScene } from "./MenuScene";
import { SettingsScene } from "./SettingsScene";
import { CreditsScene } from "./CreditsScene";
import { AdventureScene } from "./../Game/AdventureScene";

class LoadingScene extends UIScene
{
    private _Request:XMLHttpRequest;
    private _Progress:TBX.ProgressBar;
    public constructor(Old?:LoadingScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitLoadingScene();
        }
    }
    private InitLoadingScene() : void
    {
        this.Name = "Loading";
        this.BackColor = TBX.Color.Black;
        this.CreateBackground("Dark");
        this._Title.Text = TBX.Runner.Current.Game.Name;
        this._Title.TextSize = 70;
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._Progress = new TBX.ProgressBar();
        this._Progress.ChangeTargetScene(MenuScene.Current);
        this._Progress.Indicator.Paint = TBX.Color.FromRGBA(244,208,63,255);
        this.Attach(this._Progress);
        MenuScene.Current.Events.LoadComplete.push(this.LoadMenuSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Menu");
    }
    private LoadMenuSceneFinished() : void
    {
        this._Progress.ChangeTargetScene(SettingsScene.Current);
        SettingsScene.Current.Events.LoadComplete.push(this.LoadSettingsSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Settings");
    }
    private LoadSettingsSceneFinished() : void
    {
        this._Progress.ChangeTargetScene(CreditsScene.Current);
        CreditsScene.Current.Events.LoadComplete.push(this.LoadCreditsSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Credits");
    }
    private LoadCreditsSceneFinished() : void
    {
        this._Request = new XMLHttpRequest();
        this._Request.open("GET", "Resources/Data/World.json", true); 
        this._Request.onloadend = this.LoadGameDataWorldFinished.bind(this);
        this._Request.send(null);
    }
    private LoadGameDataWorldFinished() : void
    {
        World.Entries = JSON.parse(this._Request.responseText);
        this._Request = new XMLHttpRequest();
        this._Request.open("GET", "Resources/Data/Settings.json", true); 
        this._Request.onloadend = this.LoadGameDataSettingsFinished.bind(this);
        this._Request.send(null);
    }
    private LoadGameDataSettingsFinished() : void
    {
        World.Settings = JSON.parse(this._Request.responseText);
        TBX.Runner.Current.Game.Attach(new AdventureScene());
        TBX.Runner.Current.SwitchScene("Menu");
    }
    private LoadAdventureSceneFinished() : void
    {
        
    }
}