import React from "react";
import styles from "./styles.css"
import { PoemsContext } from "../../Hooks/Contexts";
import PoemCard from "../PoemCard";

interface HPSState {
	toggled: boolean;
	toggledPoem: App.Poem
}

function createArray<T>(getValue: (index: number) => T, amount: number): T[] {
	return Array.from(new Array(amount)).map((value, index) => getValue(index))
}

export default class HomePageScroller extends React.Component<{}, HPSState> {
	static contextType = PoemsContext;
	static displayName = "HomeScroller";
	context: React.ContextType<typeof PoemsContext> = this.context;
	scrollerRef: React.RefObject<HTMLDivElement>;
	poemRefs: React.RefObject<HTMLDivElement>[];
	constructor(props: {}, context: React.ContextType<typeof PoemsContext>) {
		super(props, context);

		this.state = {
			toggled: false,
			toggledPoem: null
		}

		this.poemRefs = createArray(() => React.createRef(), context.length);

		this.onToggle = this.onToggle.bind(this);
		this.onScrollTo = this.onScrollTo.bind(this);
		this.getCards = this.getCards.bind(this);
	}
	onToggle (poem: App.Poem) {
		const toggled = !this.state.toggled;

		this.setState({
			toggled,
			toggledPoem: toggled ? poem : null
		});
	}
	onScrollTo (poem: App.Poem) {
		const index = this.context.indexOf(poem);
		this.poemRefs[index].current.scrollIntoView({behavior: "smooth"});
	}
	getCards (): JSX.Element | JSX.Element[] {
		return this.context.map((poem, index) => {
			let shouldDisplay = true;
			if (this.state.toggled && (this.state.toggledPoem !== poem)) shouldDisplay = false;
			return <PoemCard poem={poem} onToggle={this.onToggle.bind(this)} onScrollTo={this.onScrollTo.bind(this)} display={shouldDisplay} key={index} ref={this.poemRefs[index]}/>
		});
	}
	render () {
		return <div className={styles.scroller} ref={this.scrollerRef}>
			{this.getCards()}
		</div>
	}
}