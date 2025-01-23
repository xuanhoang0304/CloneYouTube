import SearchPage from '@/feature/search';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { q: string };
}) {
    
    const title = searchParams.q.replaceAll("-"," ")+" - YouTube"
    return {
        title: title || "Simple Title",
    };
}
const Search = () => {
    return <SearchPage></SearchPage>;
};

export default Search;
