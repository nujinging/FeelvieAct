// 위로 올리기
const useScrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
export default useScrollTop;