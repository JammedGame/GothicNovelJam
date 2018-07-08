export { MenuButton }

import * as TBX from "engineer-js";

class MenuButton extends TBX.Button
{
    public constructor(Old?:MenuButton, Text?:string, Order?:number)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.InitMenuButton(Text, Order);
        }
    }
    private InitMenuButton(Text:string, Order:number)
    {
        this.Name = Text;
        this.Text = Text;
        this.Position = new TBX.Vertex(350, 400 + 120 * Order, 0.2);
        this.Size = new TBX.Vertex(500,90);
        this.Padding = 10;
        this.ForeColor = TBX.Color.FromString("#888888");
        this.BackColor = TBX.Color.FromRGBA(255,255,255,0);
        this.Border.Width = 0;
        this.Border.Radius = 0;
        this.TextSize = 45;
        this.TextAlign = TBX.TextAlign.Left;
    }
    public OnMouseEnter(Event:any) : void
    {
        // Override
        if(TBX.Settings.IgnoreUICSS)
        {
            this.Element.style.color = TBX.Color.White.ToString();
            this.Element.style.borderWidth = "1px 0px 1px 0px";
        }
    }
    public OnMouseLeave(Event:any) : void
    {
        // Override
        if(TBX.Settings.IgnoreUICSS)
        {
            this.Element.style.color = "#888888";
            this.Element.style.borderWidth = "0px";
        }
    }
}