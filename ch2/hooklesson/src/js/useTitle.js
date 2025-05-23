import {useEffect} from "react"

function useTitle(title) {
  useEffect( () => {
    console.log('title이 바뀜');
    decument.title = title;
  }, [title]);
}

export default useTitle;