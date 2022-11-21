export default function DownSvg() {
return (
<div className='svg-wrapper'>
<svg
id='down-svg'
alt='Move Down'
height='100%'
width='100%'
viewBox='0 0 10 9'
>
<path d='M 1,5
l 4,4 
l 4,-4 
h -2
v -4
h -4
v 4
z' 
style={{
stroke: '#ffffff',
strokeWidth: '1',
strokeLinecap: 'round',
   fill: '#ffffff',
 }}
/>
</svg>
</div>
    )
}