create table t (dte datetime,
flag as (case when dte < dateadd(second, -10, getdate()) then 0 else 1
end)
);