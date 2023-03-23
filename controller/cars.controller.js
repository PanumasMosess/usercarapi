const pool = require("../database/index");
const carsController = {
  getAllType: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("SELECT * FROM car_types");
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getAllGear: async (req, res) => {
    try {
      const [rows, fields] = await pool.query(
        "SELECT gear FROM cars group by gear"
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getBrands: async (req, res) => {
    try {
      const [rows, fields] = await pool.query(
        "SELECT title FROM car_brands group by title"
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getBrandsByType: async (req, res) => {
    try {
      const { car_type_id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM car_brands where car_type_id = ?",
        [car_type_id]
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getModelsByBrand: async (req, res) => {
    try {
      const { brand_id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM car_groups where car_brand_id = ?",
        [brand_id]
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getSubModelsByModel: async (req, res) => {
    try {
      const { model_id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM car_sub_groups where car_group_id = ?",
        [model_id]
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  //Gear
  getAllGearByBrand: async (req, res) => {
    try {
      const { brand_id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT gear FROM cars where car_brand_id = ? group by gear",
        [brand_id]
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getAllGearByModel: async (req, res) => {
    try {
      const { model_id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT gear FROM cars where car_group_id = ? group by gear",
        [model_id]
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getAllGearBySubModel: async (req, res) => {
    try {
      const { sub_model_id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT gear FROM cars where car_sub_group_id = ? group by gear",
        [sub_model_id]
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  // Year
  getAllYearByBrand: async (req, res) => {
    try {
      const { brand_id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT years FROM cars where car_brand_id = ? group by years order by years asc",
        [brand_id]
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getAllYearByModel: async (req, res) => {
    try {
      const { model_id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT years FROM cars where car_group_id = ? group by years order by years asc",
        [model_id]
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getAllYearBySubModel: async (req, res) => {
    try {
      const { sub_model_id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT years FROM cars where car_sub_group_id = ? group by years order by years asc",
        [sub_model_id]
      );
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getSearchPrice: async (req, res) => {
    try {
      let sql = "";
      const {
        car_type,
        car_brand,
        car_model,
        car_sub_model,
        car_gear,
        car_year,
      } = req.body;

      let arr_val = [];

      if (
        car_model === "" &&
        car_sub_model === "" &&
        car_gear === "" &&
        car_year === ""
      ) {
        sql =
          "SELECT a.title as type_name, b.title as brand, c.title as model, d.title as sub_model, gear, years, ttb_price " +
          "FROM  car_types a " +
          "left join car_brands b " +
          "on  b.car_type_id = a.id " +
          "left join car_groups c " +
          "on c.car_brand_id =  b.id " +
          "left join car_sub_groups d " +
          "on d.car_group_id = c.id " +
          "left join cars e " +
          "on e.car_sub_group_id = d.id " +
          "Where (a.id = ? and b.id = ?)";

        arr_val.push(car_type);
        arr_val.push(car_brand);
      } else if (car_model === "" && car_sub_model === "" && car_gear === "") {
        sql =
          "SELECT a.title as type_name, b.title as brand, c.title as model, d.title as sub_model, gear, years, ttb_price " +
          "FROM  car_types a " +
          "left join car_brands b " +
          "on  b.car_type_id = a.id " +
          "left join car_groups c " +
          "on c.car_brand_id =  b.id " +
          "left join car_sub_groups d " +
          "on d.car_group_id = c.id " +
          "left join cars e " +
          "on e.car_sub_group_id = d.id " +
          "Where (a.id = ? and b.id = ? and e.years = ?)";

        arr_val.push(car_type);
        arr_val.push(car_brand);
        arr_val.push(car_year);
      } else if (car_model === "" && car_sub_model === "") {
        sql =
          "SELECT a.title as type_name, b.title as brand, c.title as model, d.title as sub_model, gear, years, ttb_price " +
          "FROM  car_types a " +
          "left join car_brands b " +
          "on  b.car_type_id = a.id " +
          "left join car_groups c " +
          "on c.car_brand_id =  b.id " +
          "left join car_sub_groups d " +
          "on d.car_group_id = c.id " +
          "left join cars e " +
          "on e.car_sub_group_id = d.id " +
          "Where (a.id = ? and b.id = ?  and e.gear = ? and e.years = ?)";
        arr_val.push(car_type);
        arr_val.push(car_brand);
        arr_val.push(car_gear);
        arr_val.push(car_year);
      } else if (car_sub_model === "" && car_gear === "" && car_year === "") {
        sql =
          "SELECT a.title as type_name, b.title as brand, c.title as model, d.title as sub_model, gear, years, ttb_price " +
          "FROM  car_types a " +
          "left join car_brands b " +
          "on  b.car_type_id = a.id " +
          "left join car_groups c " +
          "on c.car_brand_id =  b.id " +
          "left join car_sub_groups d " +
          "on d.car_group_id = c.id " +
          "left join cars e " +
          "on e.car_sub_group_id = d.id " +
          "Where (a.id = ? and b.id = ?  and c.id = ?)";
        arr_val.push(car_type);
        arr_val.push(car_brand);
        arr_val.push(car_model);
      } else if (car_sub_model === "" && car_gear === "") {
        sql =
          "SELECT a.title as type_name, b.title as brand, c.title as model, d.title as sub_model, gear, years, ttb_price " +
          "FROM  car_types a " +
          "left join car_brands b " +
          "on  b.car_type_id = a.id " +
          "left join car_groups c " +
          "on c.car_brand_id =  b.id " +
          "left join car_sub_groups d " +
          "on d.car_group_id = c.id " +
          "left join cars e " +
          "on e.car_sub_group_id = d.id " +
          "Where (a.id = ? and b.id = ?  and c.id = ? and e.years = ?)";
        arr_val.push(car_type);
        arr_val.push(car_brand);
        arr_val.push(car_model);
        arr_val.push(car_year);
      } else if (car_gear === "" && car_year === "") {
        sql =
          "SELECT a.title as type_name, b.title as brand, c.title as model, d.title as sub_model, gear, years, ttb_price " +
          "FROM  car_types a " +
          "left join car_brands b " +
          "on  b.car_type_id = a.id " +
          "left join car_groups c " +
          "on c.car_brand_id =  b.id " +
          "left join car_sub_groups d " +
          "on d.car_group_id = c.id " +
          "left join cars e " +
          "on e.car_sub_group_id = d.id " +
          "Where (a.id = ? and b.id = ?  and c.id = ? and d.id = ?)";
        arr_val.push(car_type);
        arr_val.push(car_brand);
        arr_val.push(car_model);
        arr_val.push(car_sub_model);
      } else if (car_year === "") {
        sql =
          "SELECT a.title as type_name, b.title as brand, c.title as model, d.title as sub_model, gear, years, ttb_price " +
          "FROM  car_types a " +
          "left join car_brands b " +
          "on  b.car_type_id = a.id " +
          "left join car_groups c " +
          "on c.car_brand_id =  b.id " +
          "left join car_sub_groups d " +
          "on d.car_group_id = c.id " +
          "left join cars e " +
          "on e.car_sub_group_id = d.id " +
          "Where (a.id = ? and b.id = ?  and c.id = ? and d.id = ? and e.gear = ?)";
        arr_val.push(car_type);
        arr_val.push(car_brand);
        arr_val.push(car_model);
        arr_val.push(car_sub_model);
        arr_val.push(car_gear);
      } else if (car_sub_model === "") {
        sql =
          "SELECT a.title as type_name, b.title as brand, c.title as model, d.title as sub_model, gear, years, ttb_price " +
          "FROM  car_types a " +
          "left join car_brands b " +
          "on  b.car_type_id = a.id " +
          "left join car_groups c " +
          "on c.car_brand_id =  b.id " +
          "left join car_sub_groups d " +
          "on d.car_group_id = c.id " +
          "left join cars e " +
          "on e.car_sub_group_id = d.id " +
          "Where (a.id = ? and b.id = ?  and c.id = ? and e.years = ? and e.gear = ?)";
        arr_val.push(car_type);
        arr_val.push(car_brand);
        arr_val.push(car_model);
        arr_val.push(car_year);
        arr_val.push(car_gear);
      } else {
        sql =
          "SELECT a.title as type_name, b.title as brand, c.title as model, d.title as sub_model, gear, years, ttb_price " +
          "FROM  car_types a " +
          "left join car_brands b " +
          "on  b.car_type_id = a.id " +
          "left join car_groups c " +
          "on c.car_brand_id =  b.id " +
          "left join car_sub_groups d " +
          "on d.car_group_id = c.id " +
          "left join cars e " +
          "on e.car_sub_group_id = d.id " +
          "Where (a.id = ? and b.id = ?  and c.id = ? and d.id = ?  and e.gear = ? and e.years = ?)";
        arr_val.push(car_type);
        arr_val.push(car_brand);
        arr_val.push(car_model);
        arr_val.push(car_sub_model);
        arr_val.push(car_year);
        arr_val.push(car_gear);
      }

      const [rows, fields] = await pool.query(sql, arr_val);

      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
};

module.exports = carsController;
