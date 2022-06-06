import { useEffect, useState } from 'react';
import api from '@/api/api2'
import { useRequest } from '@/utils/requests';
interface PageProps{
  pid:string; //page id
  scene?:string; //场景
}



// eslint-disable-next-line import/no-anonymous-default-export
export default (props: PageProps)=>{
  const request = useRequest()
  const {pid} = props;

  const [page , setPage] = useState<any>()

  const getOne = async (apiKey:string,  id:string, callback:(data:any)=>void) =>{
    const res = await request(api.get(apiKey, id))
    if(res.success){
      callback(res.result)
    }
  }

  useEffect(() => {
    // getOne("layout","22", (data:any) => {
    //   setPage(data)
    // })
    console.log("====>",page)
  }, [])

  return (<div>1231</div>)
}