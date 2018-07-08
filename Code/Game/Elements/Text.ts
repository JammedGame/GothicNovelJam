export { Text }

import * as TBX from "engineer-js";

class Text extends TBX.Label
{
    public constructor(Old?:Text, Settings?:any)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.InitText(Settings);
        }
    }
    private InitText(Settings:any) : void
    {
        this.ForeColor = TBX.Color.FromString("#EEEEEE");
        this.TextSize = Settings.TextFontSize;
        this.Size = new TBX.Vertex(1000, Settings.TextHeight);
        let TextPosition:number = Settings.GlobalOffset + ((Settings.TitleVisible && Settings.TitleEffective)?Settings.TitleHeight:0) + Settings.ImageHeight + Settings.TextHeight / 2;
        this.Position = new TBX.Vertex(960, TextPosition);
        this.TextAlign = TBX.TextAlign.Center;
    }
}