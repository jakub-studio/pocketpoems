import React from "react";
import styles from "./styles.css";
import classnames from "classnames";
import OSLArray from "../../../data/osl";

function Link (props: {lib: {name: string, url: string}}) {
	return <a className={styles.linkbox} href={props.lib.url} target="_blank" rel="noopener noreferrer">
			{props.lib.name}
		</a>
}

export default function OSL () {
	return <div className={classnames(styles.flexDown, styles.page, styles.centre)}>
		<div className={styles.page_header}>Open Source Licenses</div>
		<div style={{marginBottom: "20px"}} className={styles.desc}>The following libraries are used within PocketPoems and require their licenses to be linked upon distribution of software.</div>
		{OSLArray.map(lib => <Link lib={lib}/>)}
	</div>
}