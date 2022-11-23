export default function DownSvg({fill = "none", stroke = "black"}) {
return (
<div className='svg-wrapper'>
<svg
id='down-svg'
alt='Move Down'
height='100%'
width='100%'
viewBox='0 0 16 16'
>
<path d='M 2,8
L 8,14 
L 14,8 
h -3
v -6
h -6
v 6
z' 
style={{
stroke: stroke,
strokeWidth: '1',
strokeLinecap: 'round',
   fill: fill,
 }}
/>
</svg>
</div>
    )
}