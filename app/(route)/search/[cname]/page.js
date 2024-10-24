"use client";
import { useEffect, useState, useTransition } from 'react';
import DoctorList from '@/app/_components/DoctorList';
import GlobalApi from '@/app/_utils/GlobalApi';
import ServiceList from '@/app/_components/ServiceList';
import Preloader from '@/app/_components/Loader';

export default function Search({ params }) {
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition()
  const selectedCategory = decodeURIComponent(params.cname)

  const getDoctorList = async () => {
    GlobalApi.getDoctorList().then((resp) => {
      setList(resp.data.data);
    });
  };

  const getServiceByName = async (name) => {
    GlobalApi.getServiceByName(name).then((resp) => {
      setList(resp.data.data);
    });
  }

  const fetchService = async () => {
    try {
      if (selectedCategory === 'Vet Doctor') {
        await getDoctorList();
      }
      else {
        await getServiceByName(selectedCategory);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    startTransition(async() => {
      await fetchService()
    })
  }, []);


  if (!isPending) {
    return (
      <>
        {selectedCategory === 'Vet Doctor' ? (
          <DoctorList list={list} />
        ) : (
          <ServiceList list={list} />
        )}
      </>
    );
  }
  else {
    return <Preloader bgHeight="100%" width="3rem" height="3rem" color="#0D7Dff" />
  }
}
