import StudioContent from './StudioContent';
import StudioSideBar from './StudioSideBar';

const YoutubeStudio = () => {
    return (
        <section className="pt-[56px]  w-full  mx-auto ">
            <div className="h-full flex border-t-[2px] border-solid dark:border-t-primary-bgcl border-t-gray-600">
                {/* SideBar */}
                <StudioSideBar></StudioSideBar>
                {/* Content */}
                <StudioContent></StudioContent>
            </div>
        </section>
    );
};

export default YoutubeStudio;
