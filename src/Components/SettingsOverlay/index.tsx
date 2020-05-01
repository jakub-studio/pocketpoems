import React from "react";
import SettingsOverlayProvider from "./Provider";
import Icon from "../Icon";
import { useSettingsOverlay } from "../../Hooks"
import Constants from "../../constants";
import { useTransition, animated, useSpring } from "react-spring";
import classnames from "classnames";
import styles from "./styles.css";
import Pages from "./Pages";

const Sections = {
	INFO: 0,
	ATTRIB: 1,
	OSL: 2
}

interface OverlayState {
	section: number;
}

function SettingsOverlay() {
	const overlay = useSettingsOverlay();
	const [state, setState] = React.useState<OverlayState>({ section: Sections.INFO });

	const transitions = useTransition(
		overlay.open,
		null,
		{
			config: {
				duration: 170
			},
			from: { opacity: 0 },
			enter: { opacity: 1 },
			leave: { opacity: 0 },
		}
	)

	const Section = Pages[state.section];

	return <React.Fragment>
		{transitions.map(({ item, props, key }) => (
			item && <animated.div
				key={key}
				className={classnames(styles.overlay_container, Constants.GLOBAL_CLASSNAMES.OVERLAY)}
				style={props}
			>
				<Header activeSection={state.section} onSetSection={setState} onClose={() => overlay.setOpen(false)} />
				<Section />
			</animated.div>))}
	</React.Fragment>
}

interface HeaderProps {
	onClose: () => void;
	onSetSection: ({ section: number }) => void;
	activeSection: number;
}

class Header extends React.Component<HeaderProps, { readyToRenderUnderline: boolean }> {
	linkRefs: React.RefObject<HTMLDivElement>[]
	constructor(props: HeaderProps) {
		super(props);

		this.linkRefs = [
			React.createRef(),
			React.createRef(),
			React.createRef()
		]

		this.state = {
			readyToRenderUnderline: false
		}
	}
	componentDidMount() {
		if (!this.state.readyToRenderUnderline) this.setState({ readyToRenderUnderline: true })
	}
	render() {
		return <div className={styles.header_container}>
			<div className={styles.header}>
				<Icon icon="Close" size="24px" color="white" onClick={this.props.onClose} />
				<div className={styles.paginator_select}>
					<div ref={this.linkRefs[0]} onClick={() => this.props.onSetSection({ section: Sections.INFO })}>Info</div>
					<div ref={this.linkRefs[1]} onClick={() => this.props.onSetSection({ section: Sections.ATTRIB })}>Attrib</div>
					<div ref={this.linkRefs[2]} onClick={() => this.props.onSetSection({ section: Sections.OSL })}>OSL</div>
				</div>
				<div style={{ marginRight: "44px" }} />
			</div>
			{this.state.readyToRenderUnderline ? <HeaderUnderline target={this.props.activeSection} refs={this.linkRefs} /> : <React.Fragment />}
			<div className={styles.divider} />
		</div>
	}
}

function HeaderUnderline(props: { refs: React.RefObject<HTMLDivElement>[], target: number }) {
	const rect = props.refs[props.target].current.getClientRects()[0];

	const spring = useSpring({ width: rect.width, transform: `translate(${rect.left}px)`, config: { clamp: true } });
	return <animated.div style={spring} className={styles.underline} />
}

export default SettingsOverlay;

export {
	SettingsOverlayProvider
}