import React from "react";
import styles from "./styles.css";
import classnames from "classnames";
import AppData from "../../../data/app";

export default function Info () {
	return <div className={classnames(styles.flexDown, styles.centre, styles.page)}>
		<div className={styles.page_header}>Information</div>
		<div className={styles.title}>{AppData.name}</div>
		<div className={styles.subtext}>version {AppData.version}</div>
		<div className={styles.divider} />
		<div className={styles.desc}>
			App (PWA) made to showcase some of Sue Dymoke's Poetry.
			Made for the Poetry project as part of The Fundamentals of Graphic Design module.
			<br /> <br />
			The written content may be subject to copyright by their respective owner(s).
			<br /> <br />
			This app's source code is available online on <a className={styles.link} href={AppData.url} target="_blank" rel="noopener noreferrer">GitHub</a>. The project is licensed under an Apache 2.0 license available in the linked repository.
		</div>
		<div className={styles.divider} />
		<div className={styles.desc}>
			Made with blood, sweat and whiskey by Jakub S.
		</div>
	</div>
}