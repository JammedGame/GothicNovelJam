export { AdventureScene };

import * as TBX from "engineer-js";

import { Text } from "./Elements/Text";
import { Title } from "./Elements/Title";
import { Option } from "./Elements/Option";
import { World } from "./../Data/World";

class AdventureScene extends TBX.Scene2D
{
    public static Current:AdventureScene;
    private _CurrentImage:string;
    private _CustomSettings:boolean;
    private _CustomSettingsData:any;
    private _CurrentID:string;
    private _Title:Title;
    private _Text:Text;
    private _Options:Option[];
    private _Image:TBX.Tile;
    private _Layer1:TBX.Tile;
    private _Layer2:TBX.Tile;
    private _Frame:TBX.Tile;
    public constructor(Old?:AdventureScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitAdventureScene();
            AdventureScene.Current = this;
        }
    }
    private InitAdventureScene() : void
    {
        this._CustomSettings = false;
        this._CurrentImage = "";
        this.Name = "Adventure";
        this.BackColor = TBX.Color.Black;
        this._Title = new Title(null, World.Settings);
        this._Text = new Text(null, World.Settings);
        let FramePosition:number = World.Settings.GlobalOffset + ((World.Settings.TitleVisible && World.Settings.TitleEffective)?World.Settings.TitleHeight:0) + World.Settings.ImageHeight / 2;
        this._Frame = TBX.SceneObjectUtil.CreateTile("Frame", ["Resources/Textures/Images/Frame.png"], new TBX.Vertex(960, FramePosition, 1), new TBX.Vertex(1920,World.Settings.ImageHeight,1));
        this._Frame.Paint = TBX.Color.Black;
        this._Image = TBX.SceneObjectUtil.CreateTile("Image", [], new TBX.Vertex(960, FramePosition, 0.2), new TBX.Vertex(1920,World.Settings.ImageHeight,1));
        this._Layer1 = TBX.SceneObjectUtil.CreateTile("Layer1", [], new TBX.Vertex(960, FramePosition, 0.4), new TBX.Vertex(1920,World.Settings.ImageHeight,1));
        this._Options = [];
        this._Layer1.Data["Image"] = "";
        this.Attach(this._Title);
        this.Attach(this._Text);
        this.Attach(this._Frame);
        this.Attach(this._Image);
        this.Attach(this._Layer1);
    }
    private RunCommand(Command:string) : void
    {
        if(Command.startsWith("[") && Command.endsWith("]"))
        {
            if(Command.startsWith("[CS:"))
            {
                let Scene:string = Command.replace("[CS:", "").replace("]", "");
                TBX.Runner.Current.SwitchScene(Scene);
            }
        }
        else this.SetState(Command);
    }
    public SetState(ID:string) : void
    {
        if(World.Entries[ID])
        {
            if(this._CustomSettings && !World.Entries[ID].Settings)
            {
                this._CustomSettings = false;
                this._Text.UpdateSettings(World.Settings);
            }
            if(World.Entries[ID].Settings)
            {
                this._CustomSettings = true;
                this._CustomSettingsData = this.CombineSettings(World.Entries[ID].Settings);
                this._Text.UpdateSettings(this._CustomSettingsData);
            }
            this._CurrentID = ID;
            let Entry:any = World.Entries[ID];
            console.log(Entry);
            this._Title.Text = Entry.Title;
            this._Text.Element.innerHTML = Entry.Text;
            if(Entry.Image != this._CurrentImage)
            {
                this._CurrentImage = Entry.Image;
                this._Image.Collection = new TBX.ImageCollection(null, ["Resources/Textures/Images/"+Entry.Image+".png"]);
                this._Image.Index = 0;
                this._Image.Modified = true;
            }
            if(Entry.Layer1 != "")
            {
                if(this._Layer1.Data["Image"] != Entry.Layer1)
                {
                    this._Layer1.Data["Image"] = Entry.Layer1;
                    this._Layer1.Collection = new TBX.ImageCollection(null, ["Resources/Textures/Images/"+Entry.Layer1+".png"]);
                    this._Layer1.Index = 0;
                    this._Layer1.Modified = true;
                    this._Layer1.Active = true;
                }
            }
            else this._Layer1.Active = false;
            for(let i = 0; i < this._Options.length; i++)
            {
                this.Remove(this._Options[i]);
            }
            this._Options = [];
            for(let i = 0; i < Entry.Options.length; i++)
            {
                let NewOption:Option = new Option(null, (this._CustomSettings)?this._CustomSettingsData:World.Settings, Entry.Options[i].Link, i);
                NewOption.OnChosen.push(this.RunCommand.bind(this));
                NewOption.Text = Entry.Options[i].Text;
                this._Options.push(NewOption);
                this.Attach(NewOption);
            }
            TBX.Runner.Current.DrawEngine.UpdateResolution();
        }
        else TBX.Log.Error("Entry doesn't exist!", ID, "Adventure");
    }
    public CombineSettings(Settings:any) : any
    {
      let NewSettings:any = {};
      NewSettings.GlobalOffset = (Settings.GlobalOffset)?Settings.GlobalOffset:World.Settings.GlobalOffset;
      NewSettings.TitleVisible = (Settings.TitleVisible)?Settings.TitleVisible:World.Settings.TitleVisible;
      NewSettings.TitleEffective = (Settings.TitleEffective)?Settings.TitleEffective:World.Settings.TitleEffective;
      NewSettings.TitleHeight = (Settings.TitleHeight)?Settings.TitleHeight:World.Settings.TitleHeight;
      NewSettings.TitleFontSize = (Settings.TitleFontSize)?Settings.TitleFontSize:World.Settings.TitleFontSize;
      NewSettings.ImageHeight = (Settings.ImageHeight)?Settings.ImageHeight:World.Settings.ImageHeight;
      NewSettings.TextHeight = (Settings.TextHeight)?Settings.TextHeight:World.Settings.TextHeight;
      NewSettings.TextFontSize = (Settings.TextFontSize)?Settings.TextFontSize:World.Settings.TextFontSize;
      NewSettings.OptionHeight = (Settings.OptionHeight)?Settings.OptionHeight:World.Settings.OptionHeight;
      NewSettings.OptionFontSize = (Settings.OptionFontSize)?Settings.OptionFontSize:World.Settings.OptionFontSize;
      return NewSettings;
    }
}