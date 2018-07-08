export { UIScene }; 

import * as TBX from "engineer-js";

import { Slider } from "./Elements/Slider";
import { MenuButton } from "./Elements/MenuButton";

class UIScene extends TBX.Scene2D 
{ 
    protected _Title:TBX.Label;
    protected _OverColor:TBX.Color;
    public constructor(Old?:UIScene) 
    { 
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitUIScene(); 
        }
    } 
    private InitUIScene() : void
    { 
        this.Name = "UI";
        this._OverColor = TBX.Color.Black;
        this._Title = new TBX.Label(null, "Title");
        this._Title.Size = new TBX.Vertex(960,200,1);
        this._Title.Position = new TBX.Vertex(580,150);
        this._Title.BackColor = TBX.Color.FromRGBA(255,255,255,0);
        this._Title.Border.Width = 0;
        this._Title.ForeColor = TBX.Color.White;
        this._Title.TextSize = 70;
        this._Title.TextAlign = TBX.TextAlign.Left;
        this.Attach(this._Title);
    }
    protected CreateBackground(Name:string) : void
    {
        let Back:TBX.Tile = TBX.SceneObjectUtil.CreateTile(Name, ["Resources/Textures/Backgrounds/"+Name+".png"], new TBX.Vertex(960,540), new TBX.Vertex(1920, 1080, 1));
        this.Attach(Back);
    }
    protected CreateButton(Text:string, Order:number) : TBX.Button
    {
        let NewMenuButton:MenuButton = new MenuButton(null, Text, Order);
        this.Attach(NewMenuButton);
        return NewMenuButton;
    }
    protected CreateLabel(Text:string, Order:number) : TBX.Label
    {
        let Label:TBX.Label = new TBX.Label(null, Text);
        Label.Name = Text;
        Label.Size = new TBX.Vertex(400, 50);
        Label.TextSize = 30;
        Label.TextAlign = TBX.TextAlign.Left;
        Label.Position = new TBX.Vertex(350, 300 + 60 * Order, 0.2);
        Label.ForeColor = TBX.Color.FromString("#888888");
        Label.Border.Width = 0;
        this.Attach(Label);
        return Label;
    }
    protected CreateSlider(Text:string, Value:number, Order:number) : Slider
    {
        let NewSlider:Slider = new Slider(null, Text, Value);
        NewSlider.Name = Text;
        NewSlider.Position = new TBX.Vertex(550, 300 + 120 * Order, 0.2);
        this.Attach(NewSlider);
        return NewSlider;
    }
}