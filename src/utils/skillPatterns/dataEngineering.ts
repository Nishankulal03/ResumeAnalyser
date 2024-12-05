export const DATA_ENGINEERING_PATTERNS = {
  'spark': /\b(spark|apache spark|pyspark|spark streaming|spark sql|databricks)\b/i,
  'hadoop': /\b(hadoop|hdfs|mapreduce|yarn|hive|pig|cloudera|hortonworks)\b/i,
  'etl': /\b(etl|data pipeline|data warehouse|data lake|data mart|data modeling|dimensional modeling)\b/i,
  'airflow': /\b(airflow|apache airflow|data orchestration|dag|workflow automation|scheduling)\b/i,
  'aws': /\b(aws|amazon web services|s3|redshift|emr|glue|athena|quicksight)\b/i,
  'kafka': /\b(kafka|stream processing|event streaming|real-time|pub-sub|message queue)\b/i,
  'cloud_platforms': /\b(gcp|azure|google cloud|microsoft azure|cloud computing|serverless)\b/i,
  'data_governance': /\b(data governance|data quality|data catalog|metadata|master data|data lineage)\b/i,
  'big_data': /\b(big data|distributed systems|scalability|parallel processing|data lakes|data mesh)\b/i,
  'data_security': /\b(data security|encryption|data privacy|compliance|gdpr|ccpa|hipaa)\b/i
};

export const DATA_ENGINEERING_WEIGHTS = {
  'spark': 1.8,
  'hadoop': 1.5,
  'etl': 1.7,
  'airflow': 1.6,
  'aws': 1.7,
  'kafka': 1.6,
  'cloud_platforms': 1.7,
  'data_governance': 1.5,
  'big_data': 1.6,
  'data_security': 1.5
};