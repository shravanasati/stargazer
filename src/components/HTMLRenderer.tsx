export default function HTMLRenderer({htmlCode}: {htmlCode: string}) {
	return (
		<div dangerouslySetInnerHTML={{__html: htmlCode}} />
	)
}