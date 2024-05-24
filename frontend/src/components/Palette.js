const Palette = () => {
    return (
        <div className="rounded-lg w-[230px] h-[230px] shadow-lg flex flex-col items-center ">
            <div className="palette w-[230px] h-[230px] relative rounded-lg overflow-hidden">
                <div className="origin-center ease-in-out duration-[0.3s] w-[230px] h-[230px] absolute flex flex-col justify-center bg-black font-semibold text-black hover:text-white text-center gap-4 cursor-pointer z-10 hover:z-50 rotate-45 hover:rotate-0 translate-x-[162.5px] hover:translate-x-0">
                    <span>Click me to choose black</span>
                    <span>Put your mouse outside to select other color</span>
                </div>
                <div className="origin-center ease-in-out duration-[0.3s] w-[230px] h-[230px] absolute flex flex-col justify-center bg-[#2e7ad0] font-semibold text-[#2e7ad0] hover:text-white text-center gap-4 cursor-pointer z-10 hover:z-50 rotate-45 hover:rotate-0 translate-y-[162.5px] hover:translate-y-0">
                    <span>Click me to choose blue</span>
                    <span>Put your mouse outside to select other color</span>
                </div>
                <div className="origin-center ease-in-out duration-[0.3s] w-[230px] h-[230px] absolute flex flex-col justify-center bg-[#FD8D14] font-semibold text-[#FD8D14] hover:text-white text-center gap-4 cursor-pointer z-10 hover:z-50 rotate-45 hover:rotate-0 translate-x-[-162.5px] hover:translate-x-0">
                    <span>Click me to choose orange</span>
                    <span>Put your mouse outside to select other color</span>
                </div>
                <div className="origin-center ease-in-out duration-[0.3s] w-[230px] h-[230px] absolute flex flex-col justify-center bg-[#C51605] font-semibold text-[#C51605] hover:text-white text-center gap-4 cursor-pointer z-10 hover:z-50 rotate-45 hover:rotate-0 translate-y-[-162.5px] hover:translate-y-0">
                    <span>Click me to choose red</span>
                    <span>Put your mouse outside to select other color</span>
                </div>
            </div>
        </div>
    );
};

<section id="card1" className="custom duration-[0.2s] bg-primary text-white h-[300px] relative rounded-lg flex flex-row justify-center items-center overflow-hidden hover:bg-gray-300 hover:text-terciary">
								<p className="text-2xl font-semibold text-white hover:text-gray-300">Frame</p>
								<div className="custom__content absolute p-[20px] ">
									<p class="text-xl  ">Choose a color</p>
									<Palette />
								</div>
							</section>
