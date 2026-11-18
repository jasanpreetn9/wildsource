<!--
	Shared SVG filters for the hand-drawn look, rendered once in the layout.
	"rough" pushes each point of a clean vector line around by a little noise, so
	strokes wobble like pencil. Any SVG on the page can use filter="url(#rough)".
-->
<svg width="0" height="0" class="absolute" aria-hidden="true" focusable="false">
	<defs>
		<filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
			<feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
			<feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
		</filter>
		<filter id="rough-strong" x="-10%" y="-10%" width="120%" height="120%">
			<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="9" result="n" />
			<feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
		</filter>
	</defs>
</svg>
