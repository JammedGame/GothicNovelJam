export { SettingsScene }

import * as TBX from "engineer-js";

import { UIScene } from "./UIScene"; 
import { Slider } from "./Elements/Slider";
import { SoundManager } from "./../SoundManager";

class SettingsScene extends UIScene
{
    public static Current:SettingsScene;
    private _Back:TBX.Button;
    private _MasterVolume:Slider;
    private _MusicVolume:Slider;
    private _SoundVolume:Slider;
    public constructor(Old?:SettingsScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitSettingsScene();
            SettingsScene.Current = this;
        }
    }
    private InitSettingsScene() : void
    {
        this.Name = "Settings";
        this._Title.Text = "Settings";
        this.CreateBackground("Dark");
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._MasterVolume = this.CreateSlider("Master Volume", SoundManager.MasterVolume, 0);
        this._MasterVolume.Change.push(this.UpdateMasterVolume);
        this._MusicVolume = this.CreateSlider("Music Volume", SoundManager.MusicVolume, 1);
        this._MusicVolume.Change.push(this.UpdateMusicVolume);
        this._SoundVolume = this.CreateSlider("Effect Volume", SoundManager.SoundVolume, 2);
        this._SoundVolume.Change.push(this.UpdateSoundVolume);
        this._Back = this.CreateButton("Back", 4);
        this._Back.Events.Click.push(this.BackClick);
    }
    private UpdateMasterVolume(Value:number) : void
    {
        SoundManager.MasterVolume = Value;
    }
    private UpdateMusicVolume(Value:number) : void
    {
        SoundManager.MusicVolume = Value;
    }
    private UpdateSoundVolume(Value:number) : void
    {
        SoundManager.SoundVolume = Value;
    }
    private BackClick() : void
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}