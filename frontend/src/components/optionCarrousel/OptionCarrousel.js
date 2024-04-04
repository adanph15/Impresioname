import Slider from 'react-slick';
import Circles from '../circles/Circles';
import "./OptionCarrousel.css";

const OptionCarrousel = (setLensesColor, setFrameColor, setTempleColor, setTempleTipsColor) => {

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#3C3C3C", borderRadius: '50%' }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  const templesTipsCircleColors = ['Black', 'Red', 'Pink', 'Orange', 'Blue'];
  const templesCircleColors = ['Black', 'Silver'];
  const frameCircleColors = ['Black', 'Red', 'Pink', 'Orange', 'Blue'];
  const lensesCircleColors = ['Vision', 'Sunglasses'];

  return (
    <div className='custom-content'>
      <div className='custom-content-container'>
        <Slider {...settings}>
          <div className='custom-content-item'>
            <h2 className='custom-content-item-text'>Lenses</h2>
            <Circles setColor={setLensesColor} colors={lensesCircleColors} />
          </div>
          <div className='custom-content-item'>
            <h2 className='custom-content-item-text'>Frame</h2>
            <Circles setColor={setFrameColor} colors={frameCircleColors} />
          </div>
          <div className='custom-content-item'>
            <h2 className='custom-content-item-text'>Temples</h2>
            <Circles setColor={setTempleColor} colors={templesCircleColors} />
          </div>
          <div className='custom-content-item'>
            <h2 className='custom-content-item-text'>Temples Tips</h2>
            <Circles setColor={setTempleTipsColor} colors={templesTipsCircleColors} />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default OptionCarrousel;
