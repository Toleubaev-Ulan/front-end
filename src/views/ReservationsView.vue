<template>
  <div>
    <a-page-header style="width: 50%" title="Reservations"></a-page-header>
    <div class="categ">
      <div>
        <button class="button2" @click="loadData">Upcoming</button>
      </div>
      <div>
        <button class="button2" @click="loadData2">History</button>
      </div>
    </div>
    <a-date-picker
      class="date"
      v-model:value="selectedDate"
      placeholder="Select Date"
      style="margin-bottom: 1em"
      @change="onDateChange"
    />

    <a-row>
      <template v-if="dat">
        <a-col :span="16" class="Cards">
          <div v-for="(item, index) in filteredData" :key="item.name">
            <ReservationCard
              :index="index + 1"
              :Username="item.name"
              :reservationStartTime="item.reservationStartTime"
              :table="item.tableType"
              :message="item.message"
              :orderId="item.orderId"
              :occasion="item.occasion"
              :reservationCode="item.reservationCode"
            />
            <div class="button-container">
              <button
                class="button"
                @click="view(item.orderId, item.reservationStartTime)"
              >
                View
              </button>
              <button class="buttona" @click="deleteRes(item.reservationId)">
                Delete
              </button>
            </div>
          </div>
        </a-col>
      </template>
      <template v-else>
        <a-col :span="16" class="Cards">
          <div v-for="(item, index) in filteredData2" :key="item.name">
            <ReservationCard
              :index="index + 1"
              :Username="item.name"
              :reservationStartTime="item.reservationStartTime"
              :table="item.tableType"
              :message="item.message"
              :orderId="item.orderId"
              :occasion="item.occasion"
              :reservationCode="item.reservationCode"
            />
            <div class="button-container">
              <button
                class="button"
                @click="view(item.orderId, item.reservationStartTime)"
              >
                View
              </button>
              <button class="buttona" @click="deleteRes(item.reservationId)">
                Delete
              </button>
            </div>
          </div>
        </a-col>
      </template>

      <a-col :span="8" class="Box">
        <div v-if="order" :key="order">
          <OrderCard :orderId="orderId" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ReservationApi } from "@/api/reservation";
import ReservationCard from "@/components/ReservationCard.vue";
import OrderCard from "@/components/OrderCard.vue";
import { message } from "ant-design-vue";

export default {
  components: {
    ReservationCard,
    OrderCard,
  },
  data() {
    return {
      dataList: [],
      orderId: "",
      order: false,
      reservationStartTime: 0,
      sort: [
        {
          key: "reservationStartTime",
          isAsc: 1,
        },
      ],
      dat: true,
      activeCategory: false,
      currentPage: 1,
      pageSize: 10,
      totalRecords: 0,
      selectedDate: null,
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    filteredData() {
      const currentTime = new Date().getTime() / 1000.0; // Get current time in milliseconds
      return this.dataList.filter(
        (item) => item.reservationStartTime >= currentTime
      );
    },
    filteredData2() {
      const currentTime = new Date().getTime() / 1000.0; // Get current time in milliseconds
      return this.dataList.filter(
        (item) => item.reservationStartTime <= currentTime
      );
    },
  },
  methods: {
    loadData() {
      this.dat = true;
      const uid = "";
      const rid = localStorage.getItem("rid");
      const sort = this.sort;
      ReservationApi("list", { uid, rid, sort })
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteRes(reservationId) {
      ReservationApi("delete", { reservationId }).then((res) => {
        if (res.result_code === 0) {
          message.success("Reservation deleted");
          this.loadData();
        }
      });
    },
    loadData2() {
      this.dat = false;
      const uid = "";
      const rid = localStorage.getItem("rid");
      const sort = this.sort;
      ReservationApi("list", { uid, rid, sort })
        .then((res) => {
          this.totalRecords = JSON.parse(JSON.stringify(res.data.recordcount));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async view(orderId, reservationStartTime) {
      this.order = true;
      this.orderId = orderId;
      this.reservationStartTime = reservationStartTime;
    },
    onDateChange(date) {
      console.log("Selected Date:", date);
      this.selectedDate = date;
    },
  },
};
</script>

<style lang="scss" scoped>
.Cards {
  position: relative;
  padding-left: 0.5em;
}
.Box {
  top: -17vh;
  right: 7.5em;
}
.button {
  width: 5em;
  background-color: rgb(221, 127, 48);
  border-radius: 10px;
  border: 1px solid black;
  height: 2em;
  color: white;
  position: relative;
}
.button:hover {
  background-color: black;
  color: white;
}
.buttona {
  width: 5em;
  background-color: rgb(255, 0, 0);
  border-radius: 10px;
  border: 1px solid black;
  height: 2em;
  color: white;
  position: relative;
}
.buttona:hover {
  background-color: black;
  color: white;
}
.date {
  margin-bottom: 3vh;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: -1em;
  position: relative;
  top: -2em;
  left: -20vw;
  gap: 1em;
}
.button2 {
  height: 5vh;
  margin-left: 0.5vw;
  margin-bottom: 1vw;
  width: 20vw;
  border: 1px solid rgb(221, 127, 48);
  background-color: white;
  border-radius: 20px;
}
.button2:hover {
  background-color: rgb(221, 127, 48);
  color: white;
}

.categ {
  display: flex;
  flex-direction: row;
  width: 60%;
  overflow-y: auto;
}
.categ::-webkit-scrollbar {
  display: none;
}
.button2.selected {
  background-color: rgb(221, 127, 48);
  color: white;
}
</style>
