import './Circles.css'

const Circles = ({ setColor, colors }) => (
    <div className='circle-container' >
        {colors.map((color) => (
            <div key={color} style={{ textAlign: 'center', color: `${color.toLowerCase()}`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                    className={`color-circle ${color.toLowerCase()}`}
                    onClick={() => setColor(color.toLowerCase())}
                />
                <div className={`color-circle-text ${color.toLowerCase()}`}>{color}</div>
            </div>
        ))}
    </div>
);

export default Circles;