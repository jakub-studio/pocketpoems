import React from "react";
import styles from "./styles.css";

interface PoemContentProps {
	poem: App.Poem
}

export default function PoemContent (props: PoemContentProps) {
	return <div className={styles.content_container}>
		<pre className={styles.content}> {/* Have to resort to a basic pre tag because I'm not good enough at frontend :/// */}
			{props.poem.content.join("\n")}
		</pre>
	</div>
}