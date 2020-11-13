import React from 'react';
import './App.css';
import {Field} from "./components/Field";
import {ANIMATION_DELAY, BubbleProps} from "./components/Bubble";
import {Info} from "./components/Info";
import {Subscription} from "rxjs";

const BUBBLES_COUNT = 10;

export interface AppProps {
   radius: number;
   margin: number;
}

export interface AppState {
   original: BubbleProps[];
   bubbles: BubbleProps[];
   sortInProgress: boolean;
   sortEnded: boolean;
   subscriptions?: Subscription;
}

function shuffle(array: BubbleProps[]) {
   array.sort((f, s) => Math.random() - 0.5);
}


class App extends React.Component<AppProps, AppState> {

   constructor(props: AppProps) {
      super(props);

      this.state = {
         sortInProgress: false,
         bubbles: [],
         sortEnded: false,
         original: [],
      };
   }

   private handleGenerate = () => {
      let bubbles: BubbleProps[] = [];

      for (let i = 0; i < BUBBLES_COUNT; i++) {
         bubbles.push({
            number: i,
            left: 0,
            radius: this.props.radius
         });
      }

      shuffle(bubbles);

      bubbles = bubbles.map((bubble, i) => {
         return {...bubble, left: i * (this.props.radius + this.props.margin)};
      });

      this.setState({
         original: bubbles,
         bubbles: bubbles,
         sortEnded: false
      })
   }

   private handleSort = () => {
      this.setState({sortInProgress: true});
      const animationPlan = this._sort(this.state.bubbles);

      for (let i = 0; i < animationPlan.length; i++) {
         const delay = i * ANIMATION_DELAY;
         setTimeout(() => {
            this.setState({
               bubbles: animationPlan[i]
            })
         }, delay);
      }

      const timeAfter = ANIMATION_DELAY * animationPlan.length;
      setTimeout(() => this.setState({sortInProgress: false, sortEnded: true}), timeAfter);
   }

   private _sort(bubbles: BubbleProps[]): BubbleProps[][] {
      const plan: BubbleProps[][] = [];
      const len = bubbles.length;
      let bubblesCopy = [...bubbles];

      const indexOf = (elem: BubbleProps) => {
         return bubbles.findIndex(value => value.number === elem.number)
      };

      for (let i = 0; i < len; i++) {
         for (let j = 0; j < len - 1; j++) {
            if (bubblesCopy[j].number > bubblesCopy[j + 1].number) {
               const currentIndex = indexOf(bubblesCopy[j]);
               const nextIndex = indexOf(bubblesCopy[j + 1]);

               bubbles = bubbles.map<BubbleProps>(b => {
                  return {...b};
               });
               const tmp = bubbles[currentIndex].left;
               bubbles[currentIndex].left = bubbles[nextIndex].left;
               bubbles[nextIndex].left = tmp;
               plan.push(bubbles);

               const tmpVal = bubblesCopy[j];
               bubblesCopy[j] = bubblesCopy[j + 1];
               bubblesCopy[j + 1] = tmpVal;
            }
         }
      }

      return plan;
   }

   render() {
      const {sortInProgress, sortEnded} = this.state;
      return (
         <div className="App">
            <Info/>
            <span className='mb-30'>Original:</span>
            <Field bubbleMargins={this.props.margin} bubbles={this.state.original} height={this.props.radius}/>
            <span className='mb-30'>To sort:</span>
            <Field bubbleMargins={this.props.margin} bubbles={this.state.bubbles} height={this.props.radius}/>
            <div>
               <button onClick={this.handleGenerate} disabled={sortInProgress}>Generate</button>
               <button onClick={this.handleSort} disabled={sortInProgress || sortEnded}>Sort</button>
            </div>
         </div>
      );
   }
}

export default App;
