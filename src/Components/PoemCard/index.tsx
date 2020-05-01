import React from "react";
import Constants from "../../constants";
import { MainOverlay, UpperOverlay, LowerOverlay } from "../DarkeningOverlays";
import TitleDisplay from "../PoemTitleDisplay";
import { ArrowIndicator } from "../ArrowIndicators";
import PoemView from "../PoemView";
import Icon from "../Icon";
import styles from "./styles.css";
import { usePoems, useSettingsOverlay } from "../../Hooks";
import { useSpring, animated } from "react-spring";
import classnames from "classnames";

interface PoemCardProps {
	poem: App.Poem
	onToggle: (poem: App.Poem) => void;
	onScrollTo: (poem: App.Poem) => void;
	display: boolean;
}

enum getPoemLocations {
	PREVIOUS = "PREVIOUS",
	NEXT = "NEXT"
}

function getPoem (poem: App.Poem, location: getPoemLocations ,poems: App.Poem[]): App.Poem {
	let index = poems.indexOf(poem);

	if (location === getPoemLocations.PREVIOUS) index = index - 1;
	if (location === getPoemLocations.NEXT) index = index + 1;

	return poems[index]
}

export default React.forwardRef(function PoemCard (props: PoemCardProps, ref: React.RefObject<HTMLDivElement>) {
	const poems = usePoems();
	const [toggled, setToggled] = React.useState(false);

	const previousPoem: App.Poem = getPoem(props.poem, getPoemLocations.PREVIOUS, poems);
	const nextPoem: App.Poem = getPoem(props.poem, getPoemLocations.NEXT, poems);

	const isFirstCard = poems.indexOf(props.poem) === 0;

	const onToggle = () => {
		if (ref.current.getBoundingClientRect().top !== 0) return;

		props.onToggle(props.poem);
		setToggled(!toggled);

		setTimeout(() => {
			ref.current.scrollIntoView();
		}, 200)
	}

	return <div
			ref={ref}
			className={classnames(styles.poem_card_container, {
				"overlay": toggled
			})}
			style={{backgroundImage: `url(${Constants.BASE_URL}/${Constants.PWA_RES_NAME}/img/${props.poem.coverImage}.jpg)`, display: props.display ? "block" : "none"}}
		>
		<MainOverlay extraDarken={toggled}>
			<div className={styles.poem_card}>
				<PoemView poem={props.poem} toggle={toggled} onReturnToScroller={onToggle}/>
				<UpperOverlay>
					{previousPoem ? <ArrowIndicator direction="UP" show={!toggled} onClick={() => props.onScrollTo(previousPoem)}>
						{previousPoem.name}
					</ArrowIndicator> : <div/>}
					{isFirstCard ? <FirstCardHeader show={!toggled}/> : <React.Fragment />}
				</UpperOverlay>
				<div className={styles.hitbox} onClick={onToggle}>
					<TitleDisplay toggle={toggled} poem={props.poem}/>
				</div>
				<LowerOverlay>
					{nextPoem ? <ArrowIndicator direction="DOWN" show={!toggled} onClick={() => props.onScrollTo(nextPoem)}>
						{nextPoem.name}
					</ArrowIndicator> : <div/>}
				</LowerOverlay>
			</div>
		</MainOverlay>
	</div>
});

function FirstCardHeader (props: { show: boolean }) {
	const overlay = useSettingsOverlay();
	const spring = useSpring({transform: `translate(0px, ${props.show ? 0 : -50}px`});

	return <animated.div style={spring} className={styles.first_card_header}>
		<Icon icon="Info" size="24" color="rgba(255,255,255,0.8)" onClick={() => overlay.setOpen(true)}/>
	</animated.div>
}