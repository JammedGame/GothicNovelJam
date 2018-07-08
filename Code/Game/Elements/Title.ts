export { Title }

import * as TBX from "engineer-js";

class Title extends TBX.Label
{
    public constructor(Old?:Title, Settings?:any)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.InitTitle(Settings);
        }
    }
    private InitTitle(Settings:any) : void
    {
        this.ForeColor = TBX.Color.FromString("#EEEEEE");
        this.Active = Settings.TitleVisible;
        this.TextSize = Settings.TitleFontSize;
        this.Size = new TBX.Vertex(1920, Settings.TitleHeight);
        this.Position = new TBX.Vertex(960, Settings.GlobalOffset / 2 + Settings.TitleHeight / 2);
        this.TextAlign = TBX.TextAlign.Center;
    }
}