import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "../../../Navbar/Navbar";
import styles from "./StaffList.module.css";
import StaffListCard from "./StaffListCard";
import api from "../../../../api";
import { useAuth } from "../../../../AuthContext";

export default function StaffList() {
  const { setLoader } = useAuth();
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    async function fetchStaffs() {
      try {
        setLoader(true);
        const res = await api.staffList();
        if (res.data.error) {
          setLoader(false);
          alert(res.data.errorMsg);
        } else {
          setLoader(false);
          setStaffs(res.data);
        }
      } catch (error) {
        setLoader(false);
        alert(error?.response?.data?.errorMsg || "An Error Occured!");
        console.error(error);
      }
    }

    fetchStaffs();
  }, [setLoader]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.cardContainer}>
        <Grid container spacing={3}>
          {staffs.map((staff, index) => (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <StaffListCard staff={staff} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
