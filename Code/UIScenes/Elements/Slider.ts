export { Slider }

import * as TBX from "engineer-js";

class Slider extends TBX.Tile
{
    private _Percent:number;
    private _Pointer:TBX.Tile;
    private _Label:TBX.Label;
    private _OnChange:Function[];
    public get Change():Function[] { return this._OnChange; }
    public constructor(Old?:Slider, Text?:string, Value?:number)
    {
        super(Old);
        this._OnChange = [];
        if(Old)
        {
            //TODO
        }
        else
        {
            this._Percent = 0.5;
            this.Init(Text, Value);
        }
    }
    public Init(Text?:string, Value?:number) : void
    {
        this._Percent = Value;
        this.Size = new TBX.Vertex(800, 15, 1);
        this.Paint = TBX.Color.FromString("#111111");
        this._Pointer = TBX.SceneObjectUtil.CreateTile("SliderPointer", null, new TBX.Vertex(), new TBX.Vertex(800, 15, 1));
        this._Pointer.Paint = TBX.Color.White;
        this.Events.Click.push(this.Click.bind(this));
        this._Label = new TBX.Label(null, Text);
        this._Label.ForeColor = TBX.Color.FromString("#888888");
        this._Label.Size = new TBX.Vertex(400, 45);
        this._Label.Position.X = 350;
        this._Label.TextSize = 25;
        this._Label.TextAlign = TBX.TextAlign.Left;
        this._Label.Border.Width = 0;
    }
    public OnAttach(Args:any) : void
    {
        this._Label.Position.Y = this.Position.Y - 40;
        this.UpdatePointer();
        Args.Scene.Attach(this._Pointer);
        Args.Scene.Attach(this._Label);
    }
    private UpdatePointer() : void
    {
        this._Pointer.Size.X = this._Percent * this.Size.X;
        this._Pointer.Position = this.Position.Copy();
        this._Pointer.Position.X = this.Position.X - this.Size.X / 2 + this._Percent * (this.Size.X / 2);
    }
    public Toggle(Toggled:boolean) : void
    {
        this.Active = Toggled;
        this._Pointer.Active = Toggled;
        this._Label.Active = Toggled;
    }
    private Click(G:TBX.Game, Args:any) : void
    {
        let Value:number = Args.Location.X;
        Value -= this.Position.X - this.Size.X / 2;
        Value /= this.Size.X;
        this._Percent = Value;
        this.UpdatePointer();
        for(let i in this._OnChange)
        {
            this._OnChange[i](Value);
        }
    }
}