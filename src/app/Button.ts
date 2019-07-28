import {
  Container,
  Graphics,
  Point,
  Text,
  TextStyle,
} from 'pixi.js';

import { TEXT_STYLE } from './consts';

interface ButtonProps {
  x: number;
  y: number;
  caption: string;
  anchor?: Point;
  style?: Partial<TextStyle>;
}

export default class Button extends Container {
  private _text: Text;

  constructor(props: ButtonProps) {
    super();

    const style = new TextStyle({
      ...TEXT_STYLE,
      dropShadowDistance: 6,
      ...props.style,
    });
    this._text = new Text(props.caption, style);
    this._text.position.set(props.x, props.y);
    this._text.anchor = props.anchor || new Point(0.5, 0.5);
    this.addChild(this._text);

    this.interactive = true;
    this.buttonMode = true;
    this.on('pointerover', this.onButtonOver);
    this.on('pointerout', this.onButtonOut);
    this.on('pointerdown', this.onButtonDown);
    this.on('pointerup', this.onButtonOver);
  }

  public setText(text: string) {
    this._text.text = text;
  }

  private onButtonOver = () => {
    this._text.style.fill = ['#ffffff', '#ff0099'];
    this._text.style.dropShadowDistance = 6;
  }

  private onButtonOut = () => {
    this._text.style.fill = ['#ffffff', '#00ff99'];
    this._text.style.dropShadowDistance = 6;
  }

  private onButtonDown = () => {
    this._text.style.dropShadowDistance = 3;
  }
}
