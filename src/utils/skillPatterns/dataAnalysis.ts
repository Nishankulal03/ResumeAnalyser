export const DATA_ANALYSIS_PATTERNS = {
  'python': /\b(python|pandas|numpy|scipy|scikit-learn|sklearn|matplotlib|seaborn)\b/i,
  'r': /\b(r programming|rstudio|tidyverse|ggplot2|dplyr|tidyr)\b/i,
  'sql': /\b(sql|mysql|postgresql|oracle|sql server|t-sql|pl\/sql)\b/i,
  'tableau': /\b(tableau|power bi|data visualization|looker|qlik|dashboard)\b/i,
  'statistics': /\b(statistics|statistical analysis|hypothesis testing|regression|anova|time series|forecasting)\b/i,
  'excel': /\b(excel|spreadsheet|pivot tables|vlookup|power query|dax|power pivot)\b/i,
  'machine_learning': /\b(machine learning|ml|predictive modeling|classification|clustering|random forest|xgboost)\b/i,
  'data_cleaning': /\b(data cleaning|data preprocessing|etl|data quality|data validation|data wrangling)\b/i,
  'bi_tools': /\b(business intelligence|bi tools|reporting|analytics|metrics|kpis)\b/i,
  'data_mining': /\b(data mining|feature engineering|pattern recognition|anomaly detection)\b/i
};

export const DATA_ANALYSIS_WEIGHTS = {
  'python': 1.8,
  'r': 1.5,
  'sql': 1.7,
  'tableau': 1.4,
  'statistics': 1.6,
  'excel': 1.3,
  'machine_learning': 1.6,
  'data_cleaning': 1.5,
  'bi_tools': 1.4,
  'data_mining': 1.5
};