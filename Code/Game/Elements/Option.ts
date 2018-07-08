export { Option }

import * as TBX from "engineer-js";

class Option extends TBX.Button
{
    private _Command:string;
    private _OnChosen:Function[];
    public get OnChosen():Function[] { return this._OnChosen; }
    public constructor(Old?:Option, Settings?:any, Command?:string, Index?:number)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.InitOption(Settings, Command, Index);
        }
    }
    private InitOption(Settings:any, Command:string, Index:number) : void
    {
        this._Command = Command;
        this._OnChosen = [];
        this.ForeColor = TBX.Color.FromString("#AAAAAA");
        this.BackColor = TBX.Color.FromRGBA(255,255,255,0);
        this.TextSize = Settings.OptionFontSize;
        this.Size = new TBX.Vertex(800, Settings.OptionHeight);
        let OptionPosition:number = Settings.GlobalOffset + ((Settings.TitleVisible && Settings.TitleEffective)?Settings.TitleHeight:0) + Settings.ImageHeight + Settings.TextHeight + Settings.OptionHeight * (Index + 0.5);
        console.log(OptionPosition);
        this.Position = new TBX.Vertex(960, OptionPosition);
        this.TextAlign = TBX.TextAlign.Center;
        this.Events.Click.push(this.Click.bind(this));
        this.Events.MouseEnter.push(this.MouseEnter.bind(this));
        this.Events.MouseLeave.push(this.MouseLeave.bind(this));
        this.Border.Color = TBX.Color.White;
    }
    private Click() : void
    {
        for(let i in this._OnChosen) this._OnChosen[i](this._Command);
    }
    private MouseEnter() : void
    {
        this.Element.style.color = TBX.Color.White.ToString();
        this.Element.style.borderWidth = "1px 0px 1px 0px";
    }
    private MouseLeave() : void
    {
        this.Element.style.color = "#AAAAAA";
        this.Element.style.borderWidth = "0px";
    }
}