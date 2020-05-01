import React from "react";
import Constants from "../../constants";
import { useSpring, animated, useTransition } from "react-spring";
import classnames from "classnames";
import Icon from "../Icon";
import PoemContent from "../PoemContent";
import styles from "./styles.css";

interface PoemViewProps {
	poem: App.Poem;
	onReturnToScroller: () => void;
}

/* export default function PoemView(props: PoemViewProps & { toggle: boolean }) {
	const spring = useSpring({ transform: `translate(${props.toggle ? "0" : "100"}%, 0%)` });

	return <animated.div style={spring} className={classnames(Constants.GLOBAL_CLASSNAMES.OVERLAY, styles.poem_view)}>
		<div className={classnames(styles.poemViewInner, Constants.GLOBAL_CLASSNAMES.COVER)}>
			<PoemViewHeader poem={props.poem} onReturnToScroller={props.onReturnToScroller} />
			<div className={styles.poem}>
				<PoemContent poem={props.poem} />
			</div>
			<PoemFooter poem={props.poem} />
		</div>
	</animated.div>
} */

export default function PoemView2(poemProps: PoemViewProps & { toggle: boolean }) {
	const transitions = useTransition(
		poemProps.toggle,
		null,
		{
			from: { transform: `translate(100%, 0%)`},
			enter: { transform: `translate(0%, 0%)` },
			leave: { transform: `translate(100%, 0%)` },
		}
	)

	return <React.Fragment>
		{transitions.map(({ item, props, key }) => (
			item && <animated.div
				key={key}
				className={classnames(Constants.GLOBAL_CLASSNAMES.OVERLAY, styles.poem_view)}
				style={props}
			>
				<div className={classnames(styles.poemViewInner, Constants.GLOBAL_CLASSNAMES.COVER)}>
					<PoemViewHeader poem={poemProps.poem} onReturnToScroller={poemProps.onReturnToScroller} />
					<div className={styles.poem}>
						<PoemContent poem={poemProps.poem} />
					</div>
					<PoemFooter poem={poemProps.poem} />
				</div>
			</animated.div>))}
	</React.Fragment>
}

interface PoemProps {
	poem: App.Poem
}

function PoemViewHeader(props: PoemViewProps) {
	return <div className={styles.header}>
		<ReturnToPoems onClick={props.onReturnToScroller} />
		<PoemTitle poem={props.poem} />
		<div style={{ marginLeft: "80px" }} /> {/* Spacer because CSS is weird and I'm not being paid *enough* (at all) to care. */}
	</div>
}

function ReturnToPoems(props: { onClick: () => void; }) {
	return <div className={styles.returnContainer} onClick={props.onClick}>
		<Icon icon="Arrow" size="12px" color="#fff" rotation={Icon.Rotations.LEFT} />
		<div className={styles.returnLabel}>Poems</div>
	</div>
}

function PoemTitle(props: PoemProps) {
	return <div className={styles.titleContainer}>
		<div className={styles.title}>{props.poem.name}</div>
		<div className={styles.note}>{props.poem.note}</div>
	</div>
}

function PoemFooter(props: PoemProps) {
	return <div className={classnames(styles.footer)}>
		<div>{props.poem.author}</div>
		<div>{props.poem.source.origin}, {props.poem.source.year}</div>
		<div>{props.poem.source.publisher}</div>
	</div>
}