/* =============================================================
   DỮ LIỆU: Trắc nghiệm Từ Vựng Anh Văn Chuyên Ngành
   =============================================================
   File này TÁCH RIÊNG khỏi index.html để code chính gọn hơn.
   Chỉ chứa DỮ LIỆU (câu hỏi + từ điển), không có logic hiển thị.
   Khai báo bằng const nên vẫn dùng bình thường được trong
   index.html, miễn thẻ <script src="data/tvcn-quiz-data.js">
   được đặt TRƯỚC thẻ <script> chính trong index.html.

   MUỐN THÊM CÂU HỎI MỚI: dán thêm câu vào bên trong TVCN_RAW,
   theo đúng khuôn cũ. Muốn chia theo chương/phần (Lab, Processes...)
   thì thêm 1 dòng bắt đầu bằng ## ngay trước nhóm câu đó,
   ví dụ "## Lab". Mọi câu phía sau dòng ## (tới dòng ## tiếp theo)
   sẽ thuộc về phần đó.
   ============================================================= */
const TVCN_RAW = `
## Processes
Chưng cất là gì?
mixing effects
Filtration
*Distillation
Heat Exchange

## Processes
Hấp thụ là gì?
Refining
Reactor
Gibbs free energy
*Absorption

## Processes
Chiết tách là gì?
Polymerization
Filtration
*Extraction
Drying

## Processes
Kết tinh là gì?
Compressor
Freundlich model
*Crystallization
enthalpy

## Processes
Lọc là gì?
Flowmeter
linearization
chemical equilibrium
*Filtration

## Processes
Sấy là gì?
Flowmeter
*Drying
Reactor Vessel
Hazard

## Processes
Cô đặc/Bay hơi là gì?
*Evaporation
Combustion
Polymerization
Cost Analysis

## Processes
Trộn là gì?
chemical equilibrium
*Mixing
Drying
Helmholtz free energy

## Processes
Nghiền là gì?
Cost Analysis
calorimetric effect
triple point
*Crushing / Grinding

## Processes
Bơm (chất lỏng) là gì?
activity
*Pumping
half-life
decay constant

## Processes
Tách (ly) là gì?
Crushing / Grinding
*Separation
Drying
internal energy

## Processes
Xúc tác là gì?
enthalpy of formation
Storage Tank
vapor pressure
*Catalysis

## Processes
Phản ứng trùng hợp là gì?
activity
chain reaction
*Polymerization
mixing effects

## Processes
Sự đốt cháy là gì?
Air Pollution Control
*Combustion
state variable
Agitator / Mixer

## Processes
Tinh chế là gì?
mixing effects
Heat Exchanger
*Refining
differential equation

## Processes
Trao đổi nhiệt là gì?
*Heat Exchange
triple point
Control System
Cost Analysis

## Processes
Sự lưu động hóa là gì?
activity coefficient
specific heat capacity
isochoric process
*Fluidization

## Processes
Giải hấp là gì?
chemical equilibrium
reaction order
*Desorption
Corrosion

## Processes
Lò phản ứng/Thiết bị phản ứng là gì?
Eley–Rideal mechanism
phase
*Reactor
supercritical state

## Processes
Phóng đại quy mô là gì?
ionic strength
rate law
*Scale-up
phase diagram

## Processes
Thùng/Bồn phản ứng là gì?
*Reactor Vessel
Desorption
equation of state
Boiler

## Processes
Tháp chưng cất là gì?
fugacity
reaction order
*Distillation Column
rate-limiting step

## Processes
Thiết bị trao đổi nhiệt là gì?
potential energy surface
reaction mechanism
Catalysis
*Heat Exchanger

## Processes
Máy bơm là gì?
decay constant
*Pump
Reactor Vessel
isothermal process

## Processes
Van là gì?
*Valve
reaction rate
Cost Analysis
curve fitting

## Processes
Đường ống là gì?
calorimetric effect
enthalpy of formation
Langmuir model
*Pipeline / Piping

## Processes
Máy nén là gì?
*Compressor
surroundings
adsorption
ionic strength

## Processes
Máy khuấy là gì?
Separator
*Agitator / Mixer
second-order reaction
Refining

## Processes
Máy lọc ép là gì?
Raoult’s law
*Filter Press
molar heat capacity
entropy

## Processes
Máy ly tâm là gì?
transition state
*Centrifuge
Combustion
phase

## Processes
Bồn chứa là gì?
heat capacity
*Storage Tank
Feasibility Study
Scale-up

## Processes
Quạt/Máy thổi là gì?
Material Balance
curve fitting
pre-exponential factor
*Blower / Fan

## Processes
Nồi hơi là gì?
molar heat capacity
chemical equilibrium
*Boiler
activity

## Processes
Tháp giải nhiệt là gì?
molar heat capacity
Storage Tank
Eley–Rideal mechanism
*Cooling Tower

## Processes
Thiết bị đo lường là gì?
Crushing / Grinding
heat capacity
*Instrumentation
equilibrium constant

## Processes
Hệ thống điều khiển là gì?
*Control System
ideal solution
Distillation Column
Langmuir model

## Processes
Đồng hồ đo lưu lượng là gì?
*Flowmeter
triple point
Agitator / Mixer
Henry’s law

## Processes
Áp kế là gì?
*Manometer
thermodynamics
reaction order
state variable

## Processes
Thiết bị tách là gì?
Blower / Fan
Filter Press
Heat Exchange
*Separator

## Processes
Mâm/Đĩa (trong tháp chưng cất) là gì?
Centrifuge
Langmuir model
*Tray / Plate
linearization

## Processes
Bảng dữ liệu an toàn hóa chất là gì?
Mixing
decay constant
*Safety Data Sheet (SDS)
internal energy

## Processes
Ăn mòn là gì?
*Corrosion
Energy Balance
Pumping
enthalpy of formation

## Processes
Cân bằng vật chất là gì?
adsorption isotherm
Agitator / Mixer
*Material Balance
Fluidization

## Processes
Cân bằng năng lượng là gì?
rate constant
chemical equilibrium
Valve
*Energy Balance

## Processes
Nguy cơ/Mối nguy hiểm là gì?
Air Pollution Control
*Hazard
first-order reaction
rate constant

## Processes
Xử lý nước thải là gì?
thermodynamics
system
residence time
*Wastewater Treatment

## Processes
Kiểm soát ô nhiễm không khí là gì?
Helmholtz free energy
Energy Balance
adiabatic process
*Air Pollution Control

## Processes
Tối ưu hóa là gì?
adsorption
*Optimization
pseudo-first-order
Valve

## Processes
Nghiên cứu tính khả thi là gì?
activation energy
Blower / Fan
Control System
*Feasibility Study

## Processes
Phân tích chi phí là gì?
Evaporation
thermodynamics
adsorption isotherm
*Cost Analysis

## Processes
Tốc độ phản ứng là gì?
rate constant
Distillation Column
*reaction rate
pre-exponential factor

## Processes
Quy luật tốc độ là gì?
Mixing
degrees of freedom
*rate law
Distillation Column

## Processes
Cấp phản ứng là gì?
*reaction order
triple point
Cooling Tower
isobaric process

## Processes
Hằng số tốc độ là gì?
heat
Raoult’s law
*rate constant
Helmholtz free energy

## Processes
Bậc giả là gì?
Manometer
Henry’s law
Agitator / Mixer
*pseudo-order

## Processes
Phản ứng bậc một là gì?
Mixing
equation of state
Safety Data Sheet (SDS)
*first-order reaction

## Processes
Phản ứng bậc hai là gì?
vapor pressure
phase diagram
*second-order reaction
transition state

## Processes
Phản ứng bậc không là gì?
solubility
Crushing / Grinding
Pump
*zero-order reaction

## Processes
Phản ứng bậc giả nhất là gì?
supercritical state
*pseudo-first-order
Heat Exchange
rate law

## Processes
Phản ứng chuỗi là gì?
rate constant
*chain reaction
half-life
Separation

## Processes
Năng lượng hoạt hóa là gì?
*activation energy
enthalpy
Safety Data Sheet (SDS)
state variable

## Processes
Tần số va chạm là gì?
*collision frequency
residence time
Fluidization
state variable

## Processes
Lý thuyết Arrhenius là gì?
gas constant
triple point
critical point
*Arrhenius equation

## Processes
Hằng số tiền-exponential là gì?
half-life
Polymerization
Eley–Rideal mechanism
*pre-exponential factor

## Processes
Cơ chế phản ứng là gì?
transition state
Fluidization
*reaction mechanism
Cooling Tower

## Processes
Trạng thái chuyển tiếp là gì?
*transition state
Optimization
Flowmeter
Reactor Vessel

## Processes
Mặt năng lượng tiềm năng là gì?
thermodynamics
kinetic model
chemical equilibrium
*potential energy surface

## Processes
Chất xúc tác là gì?
state
*catalyst
Combustion
critical point

## Processes
Độc chất xúc tác là gì?
*catalyst poison
Combustion
equation of state
ionic strength

## Processes
Hấp phụ là gì?
enthalpy
differential equation
*adsorption
Compressor

## Processes
Đẳng nhiệt hấp phụ là gì?
Arrhenius equation
reaction mechanism
Boiler
*adsorption isotherm

## Processes
Langmuir là gì?
Control System
Drying
activity
*Langmuir model

## Processes
Freundlich là gì?
*Freundlich model
mixing effects
Cooling Tower
Reactor Vessel

## Processes
Eley–Rideal là gì?
Langmuir model
Refining
Absorption
*Eley–Rideal mechanism

## Processes
Mặt hoạt tính là gì?
adsorption
*active site
activity
Filtration

## Processes
Hạn tốc là gì?
Drying
*rate-limiting step
first-order reaction
Fluidization

## Processes
Phân tích tuyến tính là gì?
Compressor
*linearization
Wastewater Treatment
degrees of freedom

## Processes
Phù hợp đường cong là gì?
Wastewater Treatment
*curve fitting
isochoric process
Langmuir model

## Processes
Phương trình vi phân là gì?
critical point
Storage Tank
*differential equation
triple point

## Processes
Mô hình động học là gì?
Gibbs free energy
*kinetic model
Crystallization
Heat Exchanger

## Processes
Thời gian bán hủy là gì?
Reactor Vessel
isobaric process
Instrumentation
*half-life

## Processes
Hằng số phân rã là gì?
*decay constant
activation energy
Filter Press
vapor pressure

## Processes
Khuấy trộn ảnh hưởng là gì?
isothermal process
chemical potential
*mixing effects
Tray / Plate

## Processes
Cư trú thời gian là gì?
rate law
*residence time
state
Valve

## Processes
Nhiệt động học là gì?
*thermodynamics
Henry’s law
Control System
specific heat capacity

## Processes
Trạng thái là gì?
system
catalyst poison
*state
activity coefficient

## Processes
Biến trạng thái là gì?
*state variable
Cooling Tower
calorimetric effect
molar heat capacity

## Processes
Hệ là gì?
*system
Combustion
Filtration
linearization

## Processes
Môi trường là gì?
curve fitting
transition state
first-order reaction
*surroundings

## Processes
Công là gì?
Boiler
Drying
*work
internal energy

## Processes
Nhiệt là gì?
*heat
Air Pollution Control
Crushing / Grinding
first-order reaction

## Processes
Năng lượng nội tại là gì?
*internal energy
thermodynamics
Heat Exchange
solubility

## Processes
Enthalpy là gì?
*enthalpy
state
reaction order
Corrosion

## Processes
Entropy là gì?
*entropy
adsorption isotherm
Fluidization
Valve

## Processes
Helmholtz năng lượng tự do là gì?
*Helmholtz free energy
degrees of freedom
equation of state
state variable

## Processes
Gibbs năng lượng tự do là gì?
activity
adsorption isotherm
rate law
*Gibbs free energy

## Processes
Phương trình trạng thái là gì?
*equation of state
isobaric process
Compressor
first-order reaction

## Processes
Hằng số khí là gì?
second-order reaction
*gas constant
state variable
Agitator / Mixer

## Processes
Nhiệt dung là gì?
thermodynamics
Flowmeter
*heat capacity
Separation

## Processes
Nhiệt dung riêng là gì?
Filter Press
Tray / Plate
*specific heat capacity
state variable

## Processes
Quá trình đẳng tích là gì?
activation energy
Blower / Fan
Drying
*isochoric process

## Processes
Quá trình đẳng áp là gì?
*isobaric process
Eley–Rideal mechanism
half-life
ionic strength

## Processes
Quá trình đẳng nhiệt là gì?
Blower / Fan
*isothermal process
rate law
pre-exponential factor

## Processes
Quá trình đoạn nhiệt là gì?
equation of state
enthalpy of formation
fugacity
*adiabatic process

## Processes
Cân bằng hóa học là gì?
Heat Exchanger
isothermal process
*chemical equilibrium
Raoult’s law

## Processes
Hằng số cân bằng là gì?
solubility
phase diagram
*equilibrium constant
Heat Exchange

## Processes
Tiềm năng hóa học là gì?
*chemical potential
Langmuir model
state
catalyst

## Processes
Hoạt độ là gì?
phase
chemical potential
*activity
adsorption isotherm

## Processes
Hệ số hoạt độ là gì?
*activity coefficient
equation of state
Cooling Tower
zero-order reaction

## Processes
Độ hòa tan là gì?
heat capacity
*solubility
specific heat capacity
potential energy surface

## Processes
Áp suất hơi là gì?
Pumping
Control System
*vapor pressure
second-order reaction

## Processes
Nhiệt tạo thành là gì?
Material Balance
Safety Data Sheet (SDS)
fugacity
*enthalpy of formation

## Processes
Nhiệt phản ứng là gì?
surroundings
*enthalpy of reaction
Cost Analysis
Centrifuge

## Processes
Nhiệt dung mol là gì?
*molar heat capacity
Crushing / Grinding
reaction order
rate constant

## Processes
Hoạt độ ion là gì?
Mixing
*ionic strength
rate constant
Compressor

## Processes
Độ hoạt hóa là gì?
enthalpy of reaction
*fugacity
solubility
gas constant

## Processes
Độ tự do là gì?
Wastewater Treatment
*degrees of freedom
supercritical state
Separator

## Processes
Pha là gì?
Filter Press
*phase
Arrhenius equation
Instrumentation

## Processes
Đồ thị pha là gì?
Cost Analysis
*phase diagram
Energy Balance
state

## Processes
Điểm ba là gì?
phase
*triple point
chain reaction
activity

## Processes
Điểm tới hạn là gì?
reaction rate
degrees of freedom
rate-limiting step
*critical point

## Processes
Trạng thái siêu tới hạn là gì?
vapor pressure
chain reaction
*supercritical state
Desorption

## Processes
Hỗn hợp lý tưởng là gì?
*ideal solution
Corrosion
Feasibility Study
Agitator / Mixer

## Processes
Định luật Raoult là gì?
*Raoult’s law
Feasibility Study
gas constant
enthalpy of reaction

## Processes
Định luật Henry là gì?
chemical potential
activation energy
Separation
*Henry’s law

## Processes
Hiệu ứng nhiệt là gì?
supercritical state
Filter Press
Hazard
*calorimetric effect

## Lab 1
Cốc thí nghiệm là gì?
iron ring
dropping pipette
polymer
*beaker

## Lab 1
Bình tam giác là gì?
hydrolysis
thermal annealing
capillary tube
*Erlenmeyer flask

## Lab 1
Bình cầu là gì?
modification
neutral pH
*round-bottom flask
recovery

## Lab 1
Bình cổ dài là gì?
transmission electron microscope
Gibbs energy
glass scoop
*volumetric flask

## Lab 1
Ống nghiệm là gì?
liquid–liquid extraction
Y-adapter
peak area
*test tube

## Lab 1
Ống đong là gì?
Raman spectrometer
particle size
regression coefficient
*graduated cylinder

## Lab 1
Pipet thẳng là gì?
grinding
Arrhenius plot
*volumetric pipette
safety data sheet (SDS)

## Lab 1
Pipet chia vạch là gì?
emission spectroscopy
column chromatography
volumetric pipette
*graduated pipette

## Lab 1
Micropipet là gì?
reduction reaction
*micropipette
linearity
method transfer

## Lab 1
Buret là gì?
*burette
interferences
signal normalization
gloves

## Lab 1
Phễu thủy tinh là gì?
signal stability
*glass funnel
modification
absorbance measurement

## Lab 1
Phễu chiết là gì?
*separatory funnel
polarization
membrane filtration
chromatography column

## Lab 1
Giá ống nghiệm là gì?
calibration curve
sensitivity
*test tube rack
ring stand

## Lab 1
Kẹp ống nghiệm là gì?
*test tube holder
isoelectric point
viscometer
confidence level

## Lab 1
Kẹp bình là gì?
traceability
graduated cylinder
*clamp
emergency procedure

## Lab 1
Chân đế thí nghiệm là gì?
*ring stand
emission spectroscopy
distillation
desorption

## Lab 1
Vòng kim loại là gì?
data filtering
resolution
*iron ring
external standard

## Lab 1
Lưới amiăng là gì?
*wire gauze
mixture
evaporation
turbidity

## Lab 1
Đèn cồn là gì?
*alcohol burner
warning sign
thermal annealing
sterilization

## Lab 1
Đèn Bunsen là gì?
*Bunsen burner
sonication
absolute error
standard addition

## Lab 1
Bếp điện là gì?
zeta potential
*hot plate
separation
base

## Lab 1
Bếp khuấy từ là gì?
repeatability
thermocouple
*magnetic stirrer
waste disposal

## Lab 1
Thanh khuấy là gì?
galvanic cell
grinding
*stir bar
isomer

## Lab 1
Máy khuấy là gì?
emulsion
*overhead stirrer
heterogeneous catalysis
viscosity

## Lab 1
Máy lắc là gì?
linearity
capillary tube
*orbital shaker
dilution

## Lab 1
Máy ly tâm là gì?
*centrifuge
coefficient of determination (R-squared)
intensity
sterilization

## Lab 1
Rotor ly tâm là gì?
*rotor
random error
Raman spectrometer
volumetric pipette

## Lab 1
Tủ sấy là gì?
thermocouple
linear range
degassing
*drying oven

## Lab 1
Tủ hút là gì?
differential thermal analysis (DTA)
pH electrode
*fume hood
drying

## Lab 1
Tủ khí trơ là gì?
calibration mark
performance check
*glove box
beaker with spout

## Lab 1
Tủ lạnh âm sâu là gì?
*deep freezer
recrystallization
training
particle size analyzer

## Lab 1
Tủ ủ nhiệt là gì?
ion exchange
*incubator
membrane filtration
density

## Lab 1
Nồi cách thủy là gì?
UV–Vis spectrophotometer
*water bath
expanded uncertainty
standard operating procedure (SOP)

## Lab 1
Máy đo pH là gì?
Büchner funnel
solid/water-soluble
*pH meter
potential

## Lab 1
Điện cực pH là gì?
filter tip
vacuum oven
disinfection
*pH electrode

## Lab 1
Máy đo dẫn điện là gì?
validation plan
co-precipitation
*conductivity meter
compound

## Lab 1
Máy đo thế zeta là gì?
phosphorescence
reporting limit
*zeta potential analyzer
UV absorption

## Lab 1
Cân phân tích là gì?
baseline
*analytical balance
grinding
potential

## Lab 1
Cân kỹ thuật là gì?
colloid
*top-loading balance
data smoothing
corrosivity

## Lab 1
Tủ sấy chân không là gì?
*vacuum oven
zeta potential analyzer
weighing boat
deep freezer

## Lab 1
Bơm chân không là gì?
*vacuum pump
baseline correction
functionalization
Petri dish

## Lab 1
Hệ lọc chân không là gì?
recovery
*vacuum filtration setup
electrochemical reaction
fire hazard

## Lab 1
Phễu Büchner là gì?
*Büchner funnel
qualitative analysis
pH measurement
hot plate

## Lab 1
Bình lọc là gì?
acid
test tube holder
GC system
*filtering flask

## Lab 1
Giấy lọc là gì?
*filter paper
precision
hot plate
XPS analyzer

## Lab 1
Cột sắc ký là gì?
*chromatography column
polarization
gas inlet tube
volumetric pipette

## Lab 1
Máy HPLC là gì?
*HPLC system
co-precipitation
GC system
error analysis

## Lab 1
Máy GC là gì?
*GC system
spatula
column temperature
X-ray diffraction (XRD)

## Lab 1
GC-MS là gì?
partition coefficient
drying
phosphorescence
*GC–MS

## Lab 1
LC-MS là gì?
inhibitor
pseudo-kinetics
good laboratory practice
*LC–MS

## Lab 1
Khối phổ kế là gì?
ion-exchange chromatography
toxicity
*mass spectrometer
ligand exchange

## Lab 1
Máy quang phổ UV-Vis là gì?
*UV–Vis spectrophotometer
personal protective equipment (PPE)
homogeneous catalysis
mass spectrum

## Lab 1
Máy FTIR là gì?
*FTIR spectrometer
reflux condenser
electrode
rotor

## Lab 1
Máy Raman là gì?
coefficient of determination (R-squared)
sample dryer
mass spectrometry
*Raman spectrometer

## Lab 1
XRD là gì?
Gibbs energy
baseline noise
sampler
*X-ray diffraction (XRD)

## Lab 1
SEM là gì?
GC system
colloid
*scanning electron microscope
differential thermal analysis (DTA)

## Lab 1
TEM là gì?
*transmission electron microscope
intensity
limit of quantitation
peak area

## Lab 1
TGA là gì?
polymerization
*thermogravimetric analysis (TGA)
synthesis reaction
sol–gel processing

## Lab 1
DSC là gì?
desiccator
quality control
qualitative analysis
*differential scanning calorimetry (DSC)

## Lab 1
DTA là gì?
electrode
measurement uncertainty
linear range
*differential thermal analysis (DTA)

## Lab 1
BET là gì?
alert limit
representative sampling
*BET surface area analyzer
size-exclusion chromatography

## Lab 1
Máy đo kích thước hạt là gì?
*particle size analyzer
waste segregation
mass transfer coefficient
thermal analysis

## Lab 1
Đo zeta là gì?
*zeta potential
pressure gauge
adsorption capacity
synthesis reaction

## Lab 1
Tủ sấy mẫu là gì?
*sample dryer
salt
stir bar
fractional distillation

## Lab 1
Đĩa petri là gì?
calibration
*Petri dish
titration
reporting limit

## Lab 1
Ống mao quản là gì?
homogenization
Petri dish
*capillary tube
repeatability

## Lab 1
Bơm chiết là gì?
UV–Vis spectrophotometer
synthesis reaction
face shield
*peristaltic pump

## Lab 1
Máy siêu âm là gì?
plastic cap
normal-phase chromatography
simple distillation
*ultrasonic bath

## Lab 1
Máy nghiền bi là gì?
selectivity
*ball mill
method detection limit (MDL)
standard deviation

## Lab 1
Máy nghiền hành tinh là gì?
*planetary ball mill
gradient elution
data normalization
dilution

## Lab 1
Cột sấy là gì?
alcohol burner
toxicity
infrared spectrum
*desiccator

## Lab 1
Hạt hút ẩm là gì?
emulsion
conductivity measurement
HPLC system
*desiccant

## Lab 1
Vật liệu chuẩn là gì?
dialysis
correlation coefficient
*standard reference material
aluminum foil

## Lab 1
Chai thuốc thử là gì?
*reagent bottle
turbidity
Langmuir–Hinshelwood mechanism
fume hood

## Lab 1
Chai đựng dung môi là gì?
syringe
*solvent bottle
monomer
warning sign

## Lab 1
Ống tiêm là gì?
NMR tube
*syringe
XPS analyzer
vacuum pump

## Lab 1
Kim tiêm là gì?
*needle
document traceability
reagent bottle
limit of detection

## Lab 1
Cốc có mỏ là gì?
carrier gas
activity
reduction reaction
*beaker with spout

## Lab 1
Vạch mức là gì?
filter tip
flammability
mobile phase
*calibration mark

## Lab 1
Nắp vặn là gì?
*screw cap
representative sampling
surface area
background check

## Lab 1
Nắp nhựa là gì?
particle size
*plastic cap
synthesis reaction
Y-adapter

## Lab 1
Đầu lọc là gì?
*filter tip
reduction
systematic error
calibration

## Lab 1
Dụng cụ lấy mẫu là gì?
viscosity
*sampler
recovery
separatory funnel

## Lab 1
Dao cắt mẫu là gì?
method description
*spatula
blank sample
centrifuge

## Lab 1
Thìa thủy tinh là gì?
*glass scoop
solution
absolute error
quality control (QC)

## Lab 1
Khay cân là gì?
size-exclusion chromatography
*weighing boat
separation
stationary phase

## Lab 1
Giấy bạc là gì?
hot plate
*aluminum foil
baseline correction
data filtering

## Lab 1
Nắp septum là gì?
active surface
signal stability
*septum cap
alert limit

## Lab 1
Ống NMR là gì?
crystallization
XPS analyzer
*NMR tube
electrochemical impedance spectroscopy (EIS)

## Lab 1
Máy NMR là gì?
*NMR spectrometer
recovery
electrochemical reaction
warning sign

## Lab 1
Máy XPS là gì?
viscosity
selectivity
*XPS analyzer
differential scanning calorimetry (DSC)

## Lab 1
Súng phun là gì?
*spray gun
colloid
mobile phase
isomer

## Lab 1
Lò nung là gì?
HPLC system
*muffle furnace
graduated pipette
extraction

## Lab 1
Ống thổi khí là gì?
*gas inlet tube
sonication
make-up gas
advanced oxidation

## Lab 1
Đầu thoát khí là gì?
chemisorption
*gas outlet adapter
scanning electron microscope
cross-validation

## Lab 1
Cảm biến nhiệt là gì?
electrochemical impedance spectroscopy (EIS)
*thermocouple
method validation
Raman spectroscopy

## Lab 1
Nhiệt kế là gì?
*thermometer
method transfer
recovery
surface activation

## Lab 1
Máy đo áp suất là gì?
overhead stirrer
desiccant
differential thermal analysis (DTA)
*pressure gauge

## Lab 1
Vali mẫu là gì?
*sample vial
LC–MS
oxidation
differential thermal analysis (DTA)

## Lab 1
Nút cao su là gì?
physisorption
*rubber stopper
column temperature
regression coefficient

## Lab 1
Nút thủy tinh là gì?
*glass stopper
crystallization
normal-phase chromatography
mass spectrometer

## Lab 1
Đầu nối là gì?
repeatability
charge transfer
*adapter
iron ring

## Lab 1
Ống nối chữ Y là gì?
homogeneous catalysis
dialysis
oxidation
*Y-adapter

## Lab 1
Ống đong nhỏ giọt là gì?
hypothesis testing
data filtering
corrosivity
*dropping pipette

## Lab 1
Ống sinh hàn là gì?
pressure gauge
sonication
zeta potential
*condenser

## Lab 1
Sinh hàn hồi lưu là gì?
background check
detectability
quantitative analysis
*reflux condenser

## Lab 1
Lọ sắc ký là gì?
blank sample
Petri dish
*vial (chromatography)
polymerization

## Lab 1
Máy siêu sạch là gì?
representative sampling
salt
*laminar flow hood
solvent

## Lab 1
Buồng sơn phủ là gì?
galvanic cell
peristaltic pump
*spin coater
solvent bottle

## Lab 1
Máy đo độ nhớt là gì?
test tube holder
ultrasonic bath
solid/water-soluble
*viscometer

## Lab 1
Bơm tiêm tự động là gì?
pseudo-kinetics
*autosampler
micropipette
grinding

## Lab 1
Dung môi là gì?
Petri dish
face shield
column chromatography
*solvent

## Lab 1
Chất tan là gì?
ultrafiltration
homogeneous catalysis
regeneration
*solute

## Lab 1
Dung dịch là gì?
method verification
*solution
absorption spectrum
stir bar

## Lab 1
Hỗn hợp là gì?
incubator
*mixture
base activation
drying

## Lab 1
Huyền phù là gì?
resolution
external standard
dialysis
*suspension

## Lab 1
Keo là gì?
*colloid
syringe
pH meter
quality assurance (QA)

## Lab 1
Nhũ tương là gì?
*emulsion
warning sign
calibration
quantitative analysis

## Lab 1
Axit là gì?
*acid
standard addition
differential scanning calorimetry (DSC)
mass spectrometer

## Lab 1
Bazơ là gì?
*base
reflux
colloid
selectivity

## Lab 1
Muối là gì?
*salt
GC–MS
method validation
ISO standard

## Lab 1
Oxy hóa là gì?
weighing
calibration mark
*oxidation
method description

## Lab 1
Khử là gì?
pH measurement
filtering flask
GC system
*reduction

## Lab 1
Thủy phân là gì?
peristaltic pump
*hydrolysis
deep freezer
emergency procedure

## Lab 1
Ngưng tụ là gì?
fractional distillation
*condensation
confidence level
dead time

## Lab 1
Trùng hợp là gì?
phosphorescence
Gibbs energy
*polymerization
limit of detection (LOD)

## Lab 1
Monome là gì?
ion-exchange chromatography
surface washing
*monomer
screw cap

## Lab 2
Polyme là gì?
emergency procedure
*polymer
differential scanning calorimetry (DSC)
advanced oxidation

## Lab 2
Copolyme là gì?
mass spectrum
grinding
method validation
*copolymer

## Lab 2
Xúc tiến là gì?
*promoter
electrochemical reaction
clamp
muffle furnace

## Lab 2
Ức chế là gì?
volumetric flask
muffle furnace
*inhibitor
reagent bottle

## Lab 2
Hoạt tính là gì?
*activity
ring stand
HPLC system
method optimization

## Lab 2
pH trung tính là gì?
*neutral pH
plastic cap
sonication
linear range

## Lab 2
Điểm đẳng điện là gì?
standard sample
quantitative analysis
filtering flask
*isoelectric point

## Lab 2
Điện giải là gì?
gradient elution
centrifuge
infrared spectrum
*electrolyte

## Lab 2
Dòng điện là gì?
*electric current
boiling point
solid/water-soluble
mass spectrometry

## Lab 2
Điện thế là gì?
differential scanning calorimetry (DSC)
*potential
autosampler
standard operating procedure

## Lab 2
Điện cực là gì?
*electrode
emission
stationary phase
drying

## Lab 2
Anot là gì?
overhead stirrer
solute
extraction
*anode

## Lab 2
Catot là gì?
*cathode
desiccator
particle size
spin coater

## Lab 2
Phản ứng điện hóa là gì?
particle size analyzer
volumetric flask
*electrochemical reaction
limit of detection

## Lab 2
Điện phân là gì?
*electrolysis
matrix effect
safety data sheet (SDS)
buffer preparation

## Lab 2
Pin Galvanic là gì?
liquid–liquid extraction
zeta potential analyzer
*galvanic cell
magnetic stirrer

## Lab 2
Dòng thế là gì?
*polarization
vacuum oven
ISO standard
accuracy

## Lab 2
Chuyển điện tích là gì?
recrystallization
baseline noise
*charge transfer
background check

## Lab 2
Hấp thụ UV là gì?
*UV absorption
glass funnel
Langmuir–Hinshelwood mechanism
septum cap

## Lab 2
Phát xạ là gì?
*emission
absorbance measurement
X-ray diffraction (XRD)
chromatography column

## Lab 2
Huỳnh quang là gì?
*fluorescence
safety goggles
extraction
vacuum pump

## Lab 2
Lân quang là gì?
solution
aluminum foil
noise
*phosphorescence

## Lab 2
Bước sóng là gì?
rubber stopper
*wavelength
warning sign
quality assurance

## Lab 2
Cường độ là gì?
salt
solvent bottle
*intensity
FTIR spectrometer

## Lab 2
Độ đục là gì?
calibration mark
limit of quantification (LOQ)
normal-phase chromatography
*turbidity

## Lab 2
Độ nhớt là gì?
*viscosity
surface activation
performance check
alert limit

## Lab 2
Tỷ trọng là gì?
good laboratory practice
baseline correction
*density
beaker with spout

## Lab 2
Diện tích bề mặt là gì?
ion exchange
*surface area
size distribution
demodulation

## Lab 2
Kích thước hạt là gì?
*particle size
analytical balance
absolute error
measurement uncertainty

## Lab 2
Phân bố kích thước là gì?
Bunsen burner
advanced oxidation
*size distribution
glove box

## Lab 2
Tính thấm là gì?
compound
*permeability
absorption spectrum
measurement uncertainty

## Lab 2
Hằng số cân bằng là gì?
*equilibrium constant (K)
systematic error
signal normalization
membrane filtration

## Lab 2
Hằng số tốc độ là gì?
beaker with spout
recovery
*rate constant (k)
incubator

## Lab 2
Năng lượng Gibbs là gì?
reproducibility
filtering flask
*Gibbs energy
retention time

## Lab 2
Tiêu chuẩn ISO là gì?
*ISO standard
baseline correction
safety goggles
linearity

## Lab 2
GLP là gì?
charge transfer
*good laboratory practice
simple distillation
equivalence point

## Lab 2
GMP là gì?
data smoothing
signal-to-noise ratio
demodulation
*good manufacturing practice

## Lab 2
Chuẩn bị dung môi là gì?
titration
*solvent preparation
training
stationary phase

## Lab 2
Khả năng hấp phụ là gì?
*adsorption capacity
vacuum filtration setup
document traceability
noise

## Lab 2
Động học giả là gì?
normal-phase chromatography
coefficient of determination (R-squared)
*pseudo-kinetics
partition coefficient

## Lab 2
Mô hình Langmuir–Hinshelwood là gì?
equilibrium constant (K)
dissolution
*Langmuir–Hinshelwood mechanism
equipment qualification

## Lab 2
Phân tích EIS là gì?
melting point
data filtering
*electrochemical impedance spectroscopy (EIS)
column temperature

## Lab 2
Chuẩn hóa dữ liệu là gì?
viscometer
*data normalization
equilibrium constant (K)
muffle furnace

## Lab 2
Hiệu chỉnh đường nền là gì?
desiccator
screw cap
suspension
*baseline correction

## Lab 2
Nhiễu là gì?
expanded uncertainty
measurement uncertainty
fire hazard
*noise

## Lab 2
Tỷ lệ tín hiệu/nhiễu là gì?
infrared spectrum
ultrasonic bath
*signal-to-noise ratio
quantitative analysis

## Lab 2
Độ nhạy là gì?
*sensitivity
method detection limit (MDL)
standard deviation
muffle furnace

## Lab 2
Độ chọn lọc là gì?
*selectivity
fractional distillation
active surface
stir bar

## Lab 2
Dải tuyến tính là gì?
*linear range
base
dilution
ultrafiltration

## Lab 2
Hệ số khuếch tán là gì?
*diffusion coefficient
advanced oxidation
rubber stopper
stationary phase

## Lab 2
Hệ số chuyển khối là gì?
calibration
repeatability
*mass transfer coefficient
respirator

## Lab 2
Đường cong Arrhenius là gì?
copolymer
trueness
desiccator
*Arrhenius plot

## Lab 2
Phân tích lỗi là gì?
sterilization
FTIR spectrometer
chemisorption
*error analysis

## Lab 2
Sai số tương đối là gì?
cathode
*relative error
membrane filtration
sampler

## Lab 2
Sai số tuyệt đối là gì?
membrane filtration
Arrhenius plot
solution
*absolute error

## Lab 2
Độ tin cậy là gì?
repeatability
*confidence level
weighing
extraction

## Lab 2
Khoảng tin cậy là gì?
clamp
weighing
*confidence interval
mixture

## Lab 2
Kiểm định giả thuyết là gì?
Bunsen burner
*hypothesis testing
solvent bottle
desiccator

## Lab 2
Hệ xúc tác dị thể là gì?
reporting limit
co-precipitation
ultrafiltration
*heterogeneous catalysis

## Lab 2
Hệ xúc tác đồng thể là gì?
autosampler
activity
*homogeneous catalysis
needle

## Lab 2
Bề mặt hoạt tính là gì?
surface area
oxidation
zeta potential
*active surface

## Lab 2
Phân hủy là gì?
mass spectrum
background check
oxidation reaction
*decomposition

## Lab 2
Oxy hóa nâng cao là gì?
micropipette
*advanced oxidation
waste disposal
quantitative analysis

## Lab 2
Hấp phụ vật lý là gì?
beaker
wavelength
*physisorption
grinding

## Lab 2
Hấp phụ hóa học là gì?
flow rate
thermocouple
dead time
*chemisorption

## Lab 2
Cân là gì?
corrosivity
face shield
pH electrode
*weighing

## Lab 2
Hòa tan là gì?
equivalence point
*dissolution
stir bar
method transfer

## Lab 2
Pha dung dịch là gì?
diffusion coefficient
*solution preparation
pH electrode
confidence level

## Lab 2
Pha đệm là gì?
calibration repeatability
baseline correction
*buffer preparation
action limit

## Lab 2
Hiệu chuẩn là gì?
*calibration
signal-to-noise ratio (SNR)
sensitivity
flammability

## Lab 2
Định chuẩn là gì?
demodulation
base activation
*standardization
regression coefficient

## Lab 2
Chuẩn độ là gì?
peak area
alcohol burner
*titration
oxidation reaction

## Lab 2
Điểm tương đương là gì?
*equivalence point
Y-adapter
ISO standard
magnetic stirrer

## Lab 2
Điểm cuối là gì?
corrosivity
promoter
thermal annealing
*end point

## Lab 2
Lọc là gì?
orbital shaker
*filtration
emission
confidence level

## Lab 2
Ly tâm là gì?
*centrifugation
absorbance measurement
decomposition
washing

## Lab 2
Chiết là gì?
*extraction
limit of detection
thermocouple
standard deviation

## Lab 2
Chiết lỏng–lỏng là gì?
method verification
boiling point
Büchner funnel
*liquid–liquid extraction

## Lab 2
Rửa là gì?
intensity
flammability
solvent preparation
*washing

## Lab 2
Sấy là gì?
*drying
partition coefficient
turbidity
size distribution

## Lab 2
Cô đặc là gì?
dialysis
*concentration
weighing boat
repeatability

## Lab 2
Bay hơi là gì?
relative error
*evaporation
method verification
absorption spectrum

## Lab 2
Chưng cất là gì?
column temperature
*distillation
top-loading balance
cross-validation

## Lab 2
Chưng cất đơn giản là gì?
ring stand
reagent bottle
*simple distillation
quality assurance (QA)

## Lab 2
Chưng cất phân đoạn là gì?
*fractional distillation
data filtering
pH electrode
salt

## Lab 2
Hồi lưu là gì?
*reflux
trueness
iron ring
standard sample

## Lab 2
Kết tinh là gì?
advanced oxidation
dialysis
physisorption
*crystallization

## Lab 2
Tái kết tinh là gì?
*recrystallization
warning sign
extraction
active surface

## Lab 2
Sắc ký lớp mỏng là gì?
*thin-layer chromatography (TLC)
differential scanning calorimetry (DSC)
test tube holder
polymer

## Lab 2
Sắc ký cột là gì?
*column chromatography
method validation
electrolyte
BET surface area analyzer

## Lab 2
Điểm nóng chảy là gì?
viscometer
batch record
*melting point
emission

## Lab 2
Điểm sôi là gì?
*boiling point
incubation
analytical balance
planetary ball mill

## Lab 2
Chuẩn bị mẫu là gì?
filter paper
*sample preparation
good manufacturing practice
system suitability test

## Lab 2
Nghiền là gì?
decontamination
phosphorescence
*grinding
toxicity

## Lab 2
Sàng là gì?
heterogeneous catalysis
quality control
mixture
*sieving

## Lab 2
Đo độ pH là gì?
*pH measurement
oxidation
test tube holder
internal standard

## Lab 2
Đo độ dẫn điện là gì?
disinfection
functionalization
peristaltic pump
*conductivity measurement

## Lab 2
Đo hấp thụ là gì?
*absorbance measurement
extraction
peak height
desorption

## Lab 2
Chuẩn đường nền là gì?
precision
*baseline correction
analytical balance
simple distillation

## Lab 2
Khử khí là gì?
membrane filtration
system suitability
*degassing
modification

## Lab 2
Trao đổi ion là gì?
peristaltic pump
sieving
repeatability
*ion exchange

## Lab 2
Thẩm thấu là gì?
particle size
*dialysis
sampler
glass scoop

## Lab 2
Thẩm tách là gì?
personal protective equipment (PPE)
UV absorption
mass transfer coefficient
*pervaporation

## Lab 2
Siêu lọc là gì?
*ultrafiltration
electrochemical reaction
disinfection
method transfer

## Lab 2
Lọc màng là gì?
GC system
*membrane filtration
dilution
absorption spectrum

## Lab 2
Ủ nhiệt là gì?
septum cap
*incubation
method detection limit (MDL)
size-exclusion chromatography

## Lab 2
Ủ siêu âm là gì?
clamp
*sonication
overhead stirrer
vacuum filtration setup

## Lab 2
Phản ứng tổng hợp là gì?
infrared spectrum
crystallization
systematic error
*synthesis reaction

## Lab 2
Phản ứng oxy hóa là gì?
*oxidation reaction
thermal analysis
surface area
detectability

## Lab 2
Phản ứng khử là gì?
incubation
viscosity
analytical balance
*reduction reaction

## Lab 2
Trao đổi ligand là gì?
thermal analysis
*ligand exchange
surface activation
reflux

## Lab 2
Hoạt hóa bề mặt là gì?
good manufacturing practice
*surface activation
Gibbs energy
peak height

## Lab 2
Biến tính là gì?
log recording
method validation
advanced oxidation
*modification

## Lab 2
Chức năng hóa là gì?
surface activation
zeta potential
*functionalization
potential

## Lab 2
Đồng kết tủa là gì?
*co-precipitation
LC–MS
centrifuge
phosphorescence

## Lab 2
Sol–gel là gì?
polymer
Langmuir–Hinshelwood mechanism
*sol–gel processing
filter tip

## Lab 2
Ủ nhiệt độ là gì?
*thermal annealing
log recording
limit of quantitation
modification

## Lab 2
Hoàn nguyên là gì?
separatory funnel
HPLC system
*regeneration
filtration

## Lab 2
Hoạt hóa axit là gì?
orbital shaker
relative error
document traceability
*acid activation

## Lab 2
Hoạt hóa kiềm là gì?
reversed-phase chromatography
*base activation
quantitative analysis
make-up gas

## Lab 2
Rửa bề mặt là gì?
*surface washing
scanning electron microscope
ball mill
grinding

## Lab 2
Phân tích nhiệt là gì?
drying
active surface
*thermal analysis
overhead stirrer

## Lab 2
Phân tích khối phổ là gì?
fluorescence
sterilization
heterogeneous catalysis
*mass spectrometry

## Lab 2
Quang phổ hấp thụ là gì?
decontamination
polarization
method detection limit (MDL)
*absorption spectroscopy

## Lab 2
Quang phổ phát xạ là gì?
filtration
sensitivity
*emission spectroscopy
chemisorption

## Lab 2
Chuẩn ngoại là gì?
limit of quantification (LOQ)
quality control
washing
*external standard

## Lab 2
Chuẩn nội là gì?
*internal standard
desiccator
retention time
baseline correction

## Lab 3
Đường chuẩn là gì?
*calibration curve
quality control (QC)
log recording
needle

## Lab 3
Giới hạn phát hiện là gì?
*limit of detection
spatula
emission spectrum
filtration

## Lab 3
Giới hạn định lượng là gì?
*limit of quantitation
measurement uncertainty
quality control
safety data sheet (SDS)

## Lab 3
Độ thu hồi là gì?
thermal annealing
*recovery
decomposition
micropipette

## Lab 3
Độ lặp lại là gì?
permeability
crystallization
document traceability
*repeatability

## Lab 3
Độ tái lập là gì?
alert limit
*reproducibility
normal-phase chromatography
electric current

## Lab 3
Độ không đảm bảo là gì?
document traceability
acid activation
*measurement uncertainty
septum cap

## Lab 3
Kiểm soát chất lượng là gì?
iron ring
random error
recovery
*quality control

## Lab 3
Đảm bảo chất lượng là gì?
Gibbs energy
*quality assurance
recrystallization
baseline correction

## Lab 3
SOP là gì?
simple distillation
*standard operating procedure
limit of quantitation
batch record

## Lab 3
Ghi nhật ký là gì?
*log recording
personal protective equipment (PPE)
desiccator
reporting limit

## Lab 3
Truy xuất nguồn gốc là gì?
regeneration
*traceability
partition coefficient
face shield

## Lab 3
Trang bị bảo hộ là gì?
*personal protective equipment (PPE)
oxidation reaction
linear range
safety data sheet (SDS)

## Lab 3
Áo khoác phòng thí nghiệm là gì?
*lab coat
surface washing
sample vial
standard operating procedure (SOP)

## Lab 3
Găng tay là gì?
*gloves
fluorescence
viscosity
suspension

## Lab 3
Kính bảo hộ là gì?
Arrhenius plot
*safety goggles
good laboratory practice
acid activation

## Lab 3
Tấm che mặt là gì?
*face shield
mobile phase
random error
corrosivity

## Lab 3
Mặt nạ là gì?
solvent bottle
*respirator
magnetic stirrer
phosphorescence

## Lab 3
Biển cảnh báo là gì?
*warning sign
mass transfer coefficient
normal-phase chromatography
degassing

## Lab 3
Phiếu an toàn hóa chất là gì?
*safety data sheet (SDS)
viscometer
waste segregation
dropping pipette

## Lab 3
Pha loãng là gì?
emission spectrum
scanning electron microscope
*dilution
desiccator

## Lab 3
Thải bỏ chất thải là gì?
suspension
respirator
*waste disposal
flow rate

## Lab 3
Phân loại rác là gì?
fractional distillation
data normalization
*waste segregation
peak height

## Lab 3
Hỏa hoạn là gì?
*fire hazard
round-bottom flask
decontamination
plastic cap

## Lab 3
Độc tính là gì?
*toxicity
Y-adapter
regeneration
signal normalization

## Lab 3
Ăn mòn là gì?
chromatography column
*corrosivity
deep freezer
data filtering

## Lab 3
Dễ cháy là gì?
XPS analyzer
crystallization
NMR spectrometer
*flammability

## Lab 3
Oxy hóa mạnh là gì?
phosphorescence
Bunsen burner
thermocouple
*strong oxidizer

## Lab 3
Bất hoạt sinh học là gì?
UV absorption
noise
*decontamination
incubation

## Lab 3
Khử trùng là gì?
thermogravimetric analysis (TGA)
cathode
*disinfection
sample vial

## Lab 3
Tiệt trùng là gì?
activity
peak height
*sterilization
data smoothing

## Lab 3
Quy trình khẩn cấp là gì?
standard sample
gradient elution
*emergency procedure
turbidity

## Lab 3
Tập huấn là gì?
standard operating procedure
Langmuir–Hinshelwood mechanism
boiling point
*training

## Lab 3
Kiểm định thiết bị là gì?
gas outlet adapter
regeneration
*equipment qualification
desiccant

## Lab 3
Xác nhận phương pháp là gì?
*method validation
calibration
isoelectric point
salt

## Lab 3
Kiểm tra hiệu năng là gì?
isomer
document traceability
surface area
*performance check

## Lab 3
Mẫu trắng là gì?
incubator
salt
standard deviation
*blank sample

## Lab 3
Mẫu chuẩn là gì?
filter tip
*standard sample
method description
concentration

## Lab 3
Mẫu đối chứng là gì?
decomposition
turbidity
*control sample
background check

## Lab 3
Sai số hệ thống là gì?
*systematic error
incubation
regeneration
calibration mark

## Lab 3
Sai số ngẫu nhiên là gì?
solvent
*random error
dead time
waste disposal

## Lab 3
Độ chính xác là gì?
safety goggles
face shield
*accuracy
dialysis

## Lab 3
Độ chụm là gì?
repeatability
*precision
flammability
incubator

## Lab 3
Ngưỡng cảnh báo là gì?
glass scoop
Langmuir–Hinshelwood mechanism
*alert limit
personal protective equipment (PPE)

## Lab 3
Ngưỡng hành động là gì?
absorption spectroscopy
peak height
document traceability
*action limit

## Lab 3
Truy xuất tài liệu là gì?
incubation
*document traceability
fume hood
ultrasonic bath

## Lab 3
Pipet định mức là gì?
equipment qualification
*volumetric pipette
gradient elution
ligand exchange

## Lab 3
Lấy mẫu đại diện là gì?
Erlenmeyer flask
*representative sampling
inhibitor
centrifugation

## Lab 3
Nghiền mịn là gì?
overhead stirrer
diffusion coefficient
column chromatography
*grinding

## Lab 3
Đồng nhất mẫu là gì?
iron ring
*homogenization
conductivity meter
co-precipitation

## Lab 3
Sấy khô là gì?
*drying
signal-to-noise ratio (SNR)
planetary ball mill
signal stability

## Lab 3
Hợp chất là gì?
pervaporation
weighing
dissolution
*compound

## Lab 3
Phân tích định lượng là gì?
*quantitative analysis
BET surface area analyzer
Arrhenius plot
reversed-phase chromatography

## Lab 3
Phân tích định tính là gì?
method verification
capillary tube
*qualitative analysis
face shield

## Lab 3
Giới hạn phát hiện là gì?
*limit of detection (LOD)
viscosity
ligand exchange
make-up gas

## Lab 3
Giới hạn định lượng là gì?
oxidation reaction
emulsion
*limit of quantification (LOQ)
monomer

## Lab 3
Độ đúng là gì?
thermogravimetric analysis (TGA)
thermometer
method standardization
*trueness

## Lab 3
Kiểm soát chất lượng là gì?
hydrolysis
micropipette
*quality control (QC)
absorption spectrum

## Lab 3
Đảm bảo chất lượng là gì?
drying
wire gauze
dialysis
*quality assurance (QA)

## Lab 3
SOP (quy trình chuẩn) là gì?
base
absorbance measurement
*standard operating procedure (SOP)
washing

## Lab 3
Hồ sơ lô là gì?
*batch record
recovery
base
phosphorescence

## Lab 3
Phổ hấp thụ là gì?
*absorption spectrum
surface area
reagent bottle
oxidation

## Lab 3
Phổ phát xạ là gì?
*emission spectrum
emergency procedure
incubator
electrochemical reaction

## Lab 3
Phổ hồng ngoại là gì?
*infrared spectrum
sterilization
orbital shaker
internal standard

## Lab 3
Phổ Raman là gì?
good manufacturing practice
*Raman spectroscopy
gloves
regression coefficient

## Lab 3
Phổ khối là gì?
density
weighing
*mass spectrum
gas outlet adapter

## Lab 3
Giới hạn phát hiện phương pháp là gì?
linearity
density
*method detection limit (MDL)
reagent bottle

## Lab 3
Đường nền là gì?
emergency procedure
*baseline
respirator
crystallization

## Lab 3
Hiệu chỉnh nền là gì?
data normalization
condenser
inhibitor
*baseline correction

## Lab 3
Nâng cao tín hiệu là gì?
dilution
isomer
*signal enhancement
GC system

## Lab 3
Tách sóng là gì?
dissolution
make-up gas
limit of quantification (LOQ)
*demodulation

## Lab 3
Tối ưu phương pháp là gì?
isomer
*method optimization
column temperature
volumetric pipette

## Lab 3
Chuyển giao phương pháp là gì?
graduated pipette
particle size
*method transfer
baseline correction

## Lab 3
Xác nhận cắt ngang là gì?
condensation
*cross-validation
regression coefficient
acid activation

## Lab 3
Kiểm tra đường nền là gì?
*background check
solvent preparation
decontamination
charge transfer

## Lab 3
Khả năng phát hiện là gì?
isoelectric point
*detectability
permeability
hypothesis testing

## Lab 3
Ngưỡng tín hiệu–nhiễu là gì?
*signal-to-noise ratio (SNR)
functionalization
good manufacturing practice
separation

## Lab 3
Lọc số liệu là gì?
method validation
*data filtering
overhead stirrer
fractional distillation

## Lab 3
Làm mịn dữ liệu là gì?
isoelectric point
*data smoothing
micropipette
disinfection

## Lab 3
Tách pic chồng lấn là gì?
glass stopper
*deconvolution
electrochemical impedance spectroscopy (EIS)
emulsion

## Lab 3
Chuẩn hóa tín hiệu là gì?
*signal normalization
normal-phase chromatography
limit of detection
strong oxidizer

## Lab 3
Sắc ký pha đảo là gì?
background check
*reversed-phase chromatography
isomer
expanded uncertainty

## Lab 3
Sắc ký pha thường là gì?
*normal-phase chromatography
aluminum foil
relative error
interferences

## Lab 3
Sắc ký trao đổi ion là gì?
gas outlet adapter
background check
fire hazard
*ion-exchange chromatography

## Lab 3
Sắc ký kích thước là gì?
flow rate
orbital shaker
top-loading balance
*size-exclusion chromatography

## Lab 3
SS/WS (rắn/tan trong nước) là gì?
pH electrode
acid
*solid/water-soluble
baseline correction

## Lab 3
Hệ số phân bố là gì?
chemisorption
repeatability
sonication
*partition coefficient

## Lab 3
Thời gian chết là gì?
micropipette
ion-exchange chromatography
mass spectrometry
*dead time

## Lab 3
Dòng mang là gì?
*carrier gas
volumetric pipette
respirator
micropipette

## Lab 3
Tốc độ dòng là gì?
micropipette
recovery
*flow rate
coefficient of determination (R-squared)

## Lab 3
Nhiệt độ cột là gì?
gloves
needle
*column temperature
LC–MS

## Lab 3
Khí làm sạch là gì?
extraction
potential
absolute error
*make-up gas

## Lab 3
Điều chế gradient là gì?
performance check
*gradient elution
condensation
oxidation reaction

## Lab 3
Dung môi pha động là gì?
iron ring
data smoothing
signal normalization
*mobile phase

## Lab 3
Pha tĩnh là gì?
dissolution
thermal annealing
decontamination
*stationary phase

## Lab 3
Trễ hệ thống là gì?
*system suitability
septum cap
standard addition
Büchner funnel

## Lab 3
Kiểm tra độ phù hợp hệ thống là gì?
performance check
GC–MS
face shield
*system suitability test

## Lab 3
Chuẩn hóa phương pháp là gì?
standard deviation
thermal annealing
*method standardization
blank sample

## Lab 3
Bản thuyết minh phương pháp là gì?
polarization
system suitability test
toxicity
*method description

## Lab 3
Kế hoạch thẩm định là gì?
*validation plan
volumetric pipette
vial (chromatography)
micropipette

## Lab 3
Độ lặp là gì?
*repeatability
spatula
density
vacuum oven

## Lab 3
Độ lệch chuẩn là gì?
gradient elution
*standard deviation
waste segregation
data normalization

## Lab 3
Hệ số tương quan là gì?
method description
vacuum pump
*correlation coefficient
isomer

## Lab 3
Hệ số hồi quy là gì?
*regression coefficient
conductivity measurement
top-loading balance
acid

## Lab 3
R² là gì?
*coefficient of determination (R-squared)
demodulation
Langmuir–Hinshelwood mechanism
ring stand

## Lab 3
Phục hồi là gì?
confidence level
*recovery
colloid
sterilization

## Lab 3
Thêm chuẩn là gì?
document traceability
stationary phase
*standard addition
size-exclusion chromatography

## Lab 3
Kiểm tra ma trận là gì?
retention time
analytical balance
monomer
*matrix effect

## Lab 3
Giới hạn báo cáo là gì?
*reporting limit
demodulation
resolution
solution preparation

## Lab 3
Độ tuyến tính là gì?
hypothesis testing
good laboratory practice
X-ray diffraction (XRD)
*linearity

## Lab 3
Nhiễu nền là gì?
ion exchange
hypothesis testing
anode
*baseline noise

## Lab 3
Độ phân giải là gì?
thermocouple
grinding
*resolution
pervaporation

## Lab 3
Thời gian lưu là gì?
disinfection
chromatography column
absolute error
*retention time

## Lab 3
Diện tích pic là gì?
volumetric pipette
*peak area
standardization
wavelength

## Lab 3
Chiều cao pic là gì?
*peak height
condensation
training
method standardization

## Lab 3
Giải hấp là gì?
*desorption
electrode
aluminum foil
desiccant

## Lab 3
Phân tách là gì?
*separation
water bath
solvent bottle
weighing boat

## Lab 3
Đồng phân là gì?
vacuum oven
*isomer
density
surface washing

## Lab 3
Chuẩn phương pháp là gì?
method detection limit (MDL)
*method standardization
internal standard
separation

## Lab 3
Xác nhận phương pháp là gì?
*method verification
particle size
planetary ball mill
volumetric flask

## Lab 3
Thẩm định phương pháp là gì?
electrochemical impedance spectroscopy (EIS)
*method validation
baseline correction
noise

## Lab 3
Độ bền tín hiệu là gì?
*signal stability
solvent preparation
limit of detection (LOD)
density

## Lab 3
Nhiễu liên hợp là gì?
*interferences
XPS analyzer
good manufacturing practice
extraction

## Lab 3
Độ lập lại đường chuẩn là gì?
*calibration repeatability
condensation
random error
pseudo-kinetics

## Lab 3
Khoảng làm việc là gì?
method validation
*working range
differential scanning calorimetry (DSC)
homogeneous catalysis

## Lab 3
Độ mở rộng không chắc chắn là gì?
system suitability
*expanded uncertainty
strong oxidizer
test tube holder

## Chemicals
Phiên âm đúng của từ "Hydrogen" là gì?
*/ˈhaɪ.drə.dʒən/
/ˈɛθəl ˈæsɪˌteɪt/
/jʊˈreɪ.ni.əm/
/ˈsʌl.fər/

## Chemicals
Phiên âm đúng của từ "Carbon" là gì?
/zɜːrˈkoʊ.ni.əm/
*/ˈkɑːr.bən/
/ɡoʊld/
/ˈniː.ɒn/

## Chemicals
Phiên âm đúng của từ "Nitrogen" là gì?
*/ˈnaɪ.trə.dʒən/
/ˈklɔːrəˌfɔːrm/
/ˌtɛtrəˌhaɪdroʊˈfjʊəræn/
/ˈsɪl.ɪ.kən/

## Chemicals
Phiên âm đúng của từ "Oxygen" là gì?
/ˈproʊtiːn/
*/ˈɒk.sɪ.dʒən/
/ˈmɛθəl ˌmɛθəˈkraɪleɪt/
/ˈlæktɪk ˈæsɪd/

## Chemicals
Phiên âm đúng của từ "Fluorine" là gì?
/ˈpɪrɪˌdiːn/
/ˈlæktɪk ˈæsɪd/
/ˈlɪpɪd/
*/ˈflʊə.riːn/ hoặc /ˈflɔːr.iːn/

## Chemicals
Phiên âm đúng của từ "Chlorine" là gì?
*/ˈklɔːr.iːn/
/ˈmæŋ.ɡəˌniːz/
/ˈænθrəˌsiːn/
/ˈbroʊ.miːn/

## Chemicals
Phiên âm đúng của từ "Bromine" là gì?
/mæɡˈniː.zi.əm/
/pəˈtæs.i.əm/
*/ˈbroʊ.miːn/
/ˈkɑːr.bən/

## Chemicals
Phiên âm đúng của từ "Iodine" là gì?
/ˈbjuːtəl ˈæsɪˌteɪt/
*/ˈaɪ.ə.daɪn/ hoặc /ˈaɪ.ə.diːn/
/ˈfjʊəræn/
/əˈkraɪloʊˌnaɪtraɪl/

## Chemicals
Phiên âm đúng của từ "Phosphorus" là gì?
/ˈproʊpəl ˈælkəhɒl/
/ˈɒk.sɪ.dʒən/
/ˈnæfθəˌliːn/
*/ˈfɒs.fər.əs/

## Chemicals
Phiên âm đúng của từ "Sulfur" là gì?
*/ˈsʌl.fər/
/naɪˈoʊ.bi.əm/
/ˈbɔː.rɒn/
/ˈkæl.si.əm/

## Chemicals
Phiên âm đúng của từ "Silicon" là gì?
*/ˈsɪl.ɪ.kən/
/zɪŋk/
/daɪˈmɛθəlˈfɔːrməˌmaɪd/
/ˈθælɪk ænˈhaɪdraɪd/

## Chemicals
Phiên âm đúng của từ "Boron" là gì?
/ˈbjuːtəl ˈæsɪˌteɪt/
/pəˈtæs.i.əm/
*/ˈbɔː.rɒn/
/ˈɛθəl ˈæsɪˌteɪt/

## Chemicals
Phiên âm đúng của từ "Sodium" là gì?
/ˈklɔːr.iːn/
*/ˈsoʊ.di.əm/
/ˈnaɪ.trə.dʒən/
/ˈkæl.si.əm/

## Chemicals
Phiên âm đúng của từ "Potassium" là gì?
/ˈθælɪk ænˈhaɪdraɪd/
*/pəˈtæs.i.əm/
/ˈmɜːr.kjəri/
/ˈmæŋ.ɡəˌniːz/

## Chemicals
Phiên âm đúng của từ "Magnesium" là gì?
/ˈɡluːkoʊs/
/ˈhɛpteɪn/
*/mæɡˈniː.zi.əm/
/ˈklɔːrəˌfɔːrm/

## Chemicals
Phiên âm đúng của từ "Calcium" là gì?
/ˈkoʊ.bɔːlt/
/əˈkraɪloʊˌnaɪtraɪl/
/ˈkɑːrbən ˌtɛtrəˈklɔːraɪd/
*/ˈkæl.si.əm/

## Chemicals
Phiên âm đúng của từ "Barium" là gì?
/ˈbjuːtəl ˈæsɪˌteɪt/
/ˈsɛljəˌloʊs/
*/ˈbeə.ri.əm/
/ˈklɔːrəˌfɔːrm/

## Chemicals
Phiên âm đúng của từ "Titanium" là gì?
/zɪŋk/
/ˈfɒs.fər.əs/
/ˈplæt.ɪ.nəm/
*/taɪˈteɪ.ni.əm/

## Chemicals
Phiên âm đúng của từ "Zirconium" là gì?
/ˈhɛkseɪn/
/ˈpɪrɪˌdiːn/
*/zɜːrˈkoʊ.ni.əm/
/ˈkɒp.ər/

## Chemicals
Phiên âm đúng của từ "Niobium" là gì?
*/naɪˈoʊ.bi.əm/
/ˈlɔːrɪk ˈæsɪd/
/ˈmɛθəl ˈɛθəl ˈkiːtoʊn/
/ˌsaɪkloʊˈhɛkseɪn/

## Chemicals
Phiên âm đúng của từ "Vanadium" là gì?
/ˈnæfθəˌliːn/
*/vəˈneɪ.di.əm/
/ˈsɛljəˌloʊs/
/mæɡˈniː.zi.əm/

## Chemicals
Phiên âm đúng của từ "Chromium" là gì?
/ˈsɛljəˌloʊs/
*/ˈkroʊ.mi.əm/
/ˈsɪl.ɪ.kən/
/ˈniː.ɒn/

## Chemicals
Phiên âm đúng của từ "Manganese" là gì?
/ˌbjuːtəˈdaɪ.iːn/
*/ˈmæŋ.ɡəˌniːz/
/mæɡˈniː.zi.əm/
/ɡoʊld/

## Chemicals
Phiên âm đúng của từ "Iron" là gì?
*/ˈaɪ.ərn/
/daɪˌklɔːroʊˈmiːθeɪn/
/daɪˈmɛθəl ˈsʌlfɒksaɪd/
/məˈliːɪk ænˈhaɪdraɪd/

## Chemicals
Phiên âm đúng của từ "Cobalt" là gì?
/ˈlɔːrɪk ˈæsɪd/
*/ˈkoʊ.bɔːlt/
/ˈaɪ.ərn/
/ˈklɔːrəˌfɔːrm/

## Chemicals
Phiên âm đúng của từ "Nickel" là gì?
*/ˈnɪk.əl/
/pəˈleɪ.di.əm/
/taɪˈteɪ.ni.əm/
/ˈlɔːrɪk ˈæsɪd/

## Chemicals
Phiên âm đúng của từ "Copper" là gì?
/ˈbroʊ.miːn/
/ˈænθrəˌsiːn/
*/ˈkɒp.ər/
/ˈkɑːr.bən/

## Chemicals
Phiên âm đúng của từ "Zinc" là gì?
*/zɪŋk/
/ˈɡluːkoʊs/
/daɪˈmɛθəl ˈsʌlfɒksaɪd/
/ˌtɛrəfˈθælɪk ˈæsɪd/

## Chemicals
Phiên âm đúng của từ "Arsenic" là gì?
/ˈlɔːrɪk ˈæsɪd/
/ˈɛθəl ˈæsɪˌteɪt/
*/ˈɑːr.sə.nɪk/
/daɪˌklɔːroʊˈmiːθeɪn/

## Chemicals
Phiên âm đúng của từ "Selenium" là gì?
/ˈflʊə.riːn/ hoặc /ˈflɔːr.iːn/
/ˈɑːr.sə.nɪk/
*/səˈliː.ni.əm/
/jʊˈreɪ.ni.əm/

## Chemicals
Phiên âm đúng của từ "Silver" là gì?
/ˈkroʊ.mi.əm/
*/ˈsɪl.vər/
/daɪˈmɛθəlˈfɔːrməˌmaɪd/
/ˈfruːktoʊs/

## Chemicals
Phiên âm đúng của từ "Gold" là gì?
/əˈmiːnoʊ ˈæsɪd/
*/ɡoʊld/
/əˈluː.mə.nəm/ (US) hoặc /ˌæl.jʊˈmɪn.i.əm/ (UK)
/mæɡˈniː.zi.əm/

## Chemicals
Phiên âm đúng của từ "Mercury" là gì?
/ˈɛθəl ˈæsɪˌteɪt/
/ˈsɪtrɪk ˈæsɪd/
*/ˈmɜːr.kjəri/
/zɪŋk/

## Chemicals
Phiên âm đúng của từ "Lead" là gì?
/ˈbjuːtəl ˈæsɪˌteɪt/
*/lɛd/
/ˈniː.ɒn/
/ˈflʊə.riːn/ hoặc /ˈflɔːr.iːn/

## Chemicals
Phiên âm đúng của từ "Tin" là gì?
*/tɪn/
/ˈsɪl.vər/
/ˈkæl.si.əm/
/ˈɛθəl ˈæsɪˌteɪt/

## Chemicals
Phiên âm đúng của từ "Aluminum" là gì?
/taɪˈteɪ.ni.əm/
/ˈkroʊ.mi.əm/
*/əˈluː.mə.nəm/ (US) hoặc /ˌæl.jʊˈmɪn.i.əm/ (UK)
/ˈklɔːrəˌfɔːrm/

## Chemicals
Phiên âm đúng của từ "Platinum" là gì?
/ˈfruːktoʊs/
*/ˈplæt.ɪ.nəm/
/ˈlæktɪk ˈæsɪd/
/ˈnæfθəˌliːn/

## Chemicals
Phiên âm đúng của từ "Palladium" là gì?
/ˈhɛkseɪn/
*/pəˈleɪ.di.əm/
/əˈmiːnoʊ ˈæsɪd/
/jʊˈreɪ.ni.əm/

## Chemicals
Phiên âm đúng của từ "Uranium" là gì?
/taɪˈteɪ.ni.əm/
*/jʊˈreɪ.ni.əm/
/ˈaɪ.ə.daɪn/ hoặc /ˈaɪ.ə.diːn/
/ˈbjuːtənɒl/

## Chemicals
Phiên âm đúng của từ "Neon" là gì?
/zɜːrˈkoʊ.ni.əm/
/ˈbeə.ri.əm/
*/ˈniː.ɒn/
/ɡoʊld/

## Chemicals
Phiên âm đúng của từ "Butadiene" là gì?
*/ˌbjuːtəˈdaɪ.iːn/
/ˈlɔːrɪk ˈæsɪd/
/əˈmiːnoʊ ˈæsɪd/
/zɜːrˈkoʊ.ni.əm/

## Chemicals
Phiên âm đúng của từ "Cyclohexane" là gì?
/ˈsʌl.fər/
/ˈbjuːtəl ˈæsɪˌteɪt/
/ˌtɛtrəˌhaɪdroʊˈfjʊəræn/
*/ˌsaɪkloʊˈhɛkseɪn/

## Chemicals
Phiên âm đúng của từ "Hexane" là gì?
/ˈfjʊəræn/
*/ˈhɛkseɪn/
/ˈlɔːrɪk ˈæsɪd/
/daɪˈmɛθəlˈfɔːrməˌmaɪd/

## Chemicals
Phiên âm đúng của từ "Heptane" là gì?
/ˈænθrəˌsiːn/
/ˈbɔː.rɒn/
/daɪˈmɛθəlˈfɔːrməˌmaɪd/
*/ˈhɛpteɪn/

## Chemicals
Phiên âm đúng của từ "Octane" là gì?
*/ˈɒkteɪn/
/əˈdɪpɪk ˈæsɪd/
/zɪŋk/
/ˈklɔːrəˌfɔːrm/

## Chemicals
Phiên âm đúng của từ "Naphthalene" là gì?
*/ˈnæfθəˌliːn/
/əˈmiːnoʊ ˈæsɪd/
/ˈsuːkroʊs/
/ˈhɛpteɪn/

## Chemicals
Phiên âm đúng của từ "Anthracene" là gì?
/ˈklɔːr.iːn/
/ˈhɛpteɪn/
/ˈbroʊ.miːn/
*/ˈænθrəˌsiːn/

## Chemicals
Phiên âm đúng của từ "Pyridine" là gì?
/ˈkæl.si.əm/
*/ˈpɪrɪˌdiːn/
/ˈnaɪ.trə.dʒən/
/vəˈneɪ.di.əm/

## Chemicals
Phiên âm đúng của từ "Furan" là gì?
/ˈbeə.ri.əm/
/ˈklɔːrəˌfɔːrm/
*/ˈfjʊəræn/
/ˈnɪk.əl/

## Chemicals
Phiên âm đúng của từ "Tetrahydrofuran (THF)" là gì?
/ˈænθrəˌsiːn/
/ˈmɜːr.kjəri/
/ˈbɔː.rɒn/
*/ˌtɛtrəˌhaɪdroʊˈfjʊəræn/

## Chemicals
Phiên âm đúng của từ "Dimethyl Sulfoxide (DMSO)" là gì?
/əˈkraɪloʊˌnaɪtraɪl/
*/daɪˈmɛθəl ˈsʌlfɒksaɪd/
/ˈniː.ɒn/
/ˈbroʊ.miːn/

## Chemicals
Phiên âm đúng của từ "Acrylonitrile" là gì?
/ˈsoʊ.di.əm/
/ˈhaɪ.drə.dʒən/
*/əˈkraɪloʊˌnaɪtraɪl/
/zɪŋk/

## Chemicals
Phiên âm đúng của từ "Methyl Methacrylate (MMA)" là gì?
/ˈsɛljəˌloʊs/
/ˈɑːr.sə.nɪk/
*/ˈmɛθəl ˌmɛθəˈkraɪleɪt/
/ˈθælɪk ænˈhaɪdraɪd/

## Chemicals
Phiên âm đúng của từ "Butanol" là gì?
/ˈkæl.si.əm/
*/ˈbjuːtənɒl/
/ˈklɔːrəˌfɔːrm/
/ˈhɛpteɪn/

## Chemicals
Phiên âm đúng của từ "Dichloromethane" là gì?
/ˌtɛtrəˌhaɪdroʊˈfjʊəræn/
/səˈliː.ni.əm/
/ˈbɔː.rɒn/
*/daɪˌklɔːroʊˈmiːθeɪn/

## Chemicals
Phiên âm đúng của từ "Chloroform" là gì?
/ˈpɪrɪˌdiːn/
/jʊˈreɪ.ni.əm/
*/ˈklɔːrəˌfɔːrm/
/taɪˈteɪ.ni.əm/

## Chemicals
Phiên âm đúng của từ "Carbon Tetrachloride" là gì?
/ˈfɒs.fər.əs/
/ˈfruːktoʊs/
/ˈmɛθəl ˈɛθəl ˈkiːtoʊn/
*/ˈkɑːrbən ˌtɛtrəˈklɔːraɪd/

## Chemicals
Phiên âm đúng của từ "Ethyl Acetate" là gì?
*/ˈɛθəl ˈæsɪˌteɪt/
/ˈɒkteɪn/
/zɪŋk/
/ˈkɑːrbən ˌtɛtrəˈklɔːraɪd/

## Chemicals
Phiên âm đúng của từ "Butyl Acetate" là gì?
/ˈbɔː.rɒn/
/ˈsoʊ.di.əm/
*/ˈbjuːtəl ˈæsɪˌteɪt/
/zɪŋk/

## Chemicals
Phiên âm đúng của từ "Dimethylformamide (DMF)" là gì?
/daɪˌklɔːroʊˈmiːθeɪn/
/ˌbjuːtəˈdaɪ.iːn/
*/daɪˈmɛθəlˈfɔːrməˌmaɪd/
/ˈɒkteɪn/

## Chemicals
Phiên âm đúng của từ "Dioxane" là gì?
/ˈsɪl.ɪ.kən/
*/daɪˈɒkseɪn/
/ˈsuːkroʊs/
/ɡoʊld/

## Chemicals
Phiên âm đúng của từ "Diethyl Ether" là gì?
*/daɪˈɛθəl ˈiːθər/
/ˈθælɪk ænˈhaɪdraɪd/
/ˈkɒp.ər/
/jʊˈreɪ.ni.əm/

## Chemicals
Phiên âm đúng của từ "Propyl Alcohol" là gì?
/ˈbroʊ.miːn/
*/ˈproʊpəl ˈælkəhɒl/
/pəˈleɪ.di.əm/
/ˈsɪl.vər/

## Chemicals
Phiên âm đúng của từ "Lauric Acid" là gì?
/ˈsɪl.vər/
/ˈlɪpɪd/
/əˈdɪpɪk ˈæsɪd/
*/ˈlɔːrɪk ˈæsɪd/

## Chemicals
Phiên âm đúng của từ "Adipic Acid" là gì?
*/əˈdɪpɪk ˈæsɪd/
/ˈænθrəˌsiːn/
/ˌbjuːtəˈdaɪ.iːn/
/ˈbeə.ri.əm/

## Chemicals
Phiên âm đúng của từ "Terephthalic Acid" là gì?
/ˈænθrəˌsiːn/
/ˈsɪtrɪk ˈæsɪd/
*/ˌtɛrəfˈθælɪk ˈæsɪd/
/ˈmæŋ.ɡəˌniːz/

## Chemicals
Phiên âm đúng của từ "Maleic Anhydride" là gì?
/ˈsɛljəˌloʊs/
/ˈkɑːr.bən/
*/məˈliːɪk ænˈhaɪdraɪd/
/ˈfɒs.fər.əs/

## Chemicals
Phiên âm đúng của từ "Phthalic Anhydride" là gì?
*/ˈθælɪk ænˈhaɪdraɪd/
/ˈaɪ.ə.daɪn/ hoặc /ˈaɪ.ə.diːn/
/əˈdɪpɪk ˈæsɪd/
/daɪˈmɛθəl ˈsʌlfɒksaɪd/

## Chemicals
Phiên âm đúng của từ "Methyl Ethyl Ketone (MEK)" là gì?
/əˈkraɪloʊˌnaɪtraɪl/
*/ˈmɛθəl ˈɛθəl ˈkiːtoʊn/
/ˈsɪl.ɪ.kən/
/daɪˌklɔːroʊˈmiːθeɪn/

## Chemicals
Phiên âm đúng của từ "Lactic Acid" là gì?
/ˈsɪl.ɪ.kən/
/ˌtɛrəfˈθælɪk ˈæsɪd/
*/ˈlæktɪk ˈæsɪd/
/ˈniː.ɒn/

## Chemicals
Phiên âm đúng của từ "Citric Acid" là gì?
*/ˈsɪtrɪk ˈæsɪd/
/daɪˈmɛθəl ˈsʌlfɒksaɪd/
/ˈfɒs.fər.əs/
/ˈsɛljəˌloʊs/

## Chemicals
Phiên âm đúng của từ "Sucrose" là gì?
/ˈaɪ.ə.daɪn/ hoặc /ˈaɪ.ə.diːn/
/ɡoʊld/
/ˈsɪl.vər/
*/ˈsuːkroʊs/

## Chemicals
Phiên âm đúng của từ "Glucose" là gì?
/ˈbjuːtəl ˈæsɪˌteɪt/
*/ˈɡluːkoʊs/
/ˈaɪ.ə.daɪn/ hoặc /ˈaɪ.ə.diːn/
/ˈɛnzaɪm/

## Chemicals
Phiên âm đúng của từ "Fructose" là gì?
/ˈkɑːr.bən/
/ˈkæl.si.əm/
/taɪˈteɪ.ni.əm/
*/ˈfruːktoʊs/

## Chemicals
Phiên âm đúng của từ "Amino Acid" là gì?
/məˈliːɪk ænˈhaɪdraɪd/
*/əˈmiːnoʊ ˈæsɪd/
/lɛd/
/ˈɒkteɪn/

## Chemicals
Phiên âm đúng của từ "Protein" là gì?
*/ˈproʊtiːn/
/ˈɒk.sɪ.dʒən/
/tɪn/
/ˈkæl.si.əm/

## Chemicals
Phiên âm đúng của từ "Cellulose" là gì?
/lɛd/
/ˈfɒs.fər.əs/
/ˈθælɪk ænˈhaɪdraɪd/
*/ˈsɛljəˌloʊs/

## Chemicals
Phiên âm đúng của từ "Lipid" là gì?
/ˌtɛrəfˈθælɪk ˈæsɪd/
*/ˈlɪpɪd/
/ˈænθrəˌsiːn/
/ˈaɪ.ə.daɪn/ hoặc /ˈaɪ.ə.diːn/

## Chemicals
Phiên âm đúng của từ "Enzyme" là gì?
/ˈpɪrɪˌdiːn/
/ˈmɜːr.kjəri/
/vəˈneɪ.di.əm/
*/ˈɛnzaɪm/
`;

const TVCN_GLOSSARY = [
  {
    "chuong": "Processes",
    "terms": [
      {
        "a": "Chưng cất",
        "b": "Distillation"
      },
      {
        "a": "Hấp thụ",
        "b": "Absorption"
      },
      {
        "a": "Chiết tách",
        "b": "Extraction"
      },
      {
        "a": "Kết tinh",
        "b": "Crystallization"
      },
      {
        "a": "Lọc",
        "b": "Filtration"
      },
      {
        "a": "Sấy",
        "b": "Drying"
      },
      {
        "a": "Cô đặc/Bay hơi",
        "b": "Evaporation"
      },
      {
        "a": "Trộn",
        "b": "Mixing"
      },
      {
        "a": "Nghiền",
        "b": "Crushing / Grinding"
      },
      {
        "a": "Bơm (chất lỏng)",
        "b": "Pumping"
      },
      {
        "a": "Tách (ly)",
        "b": "Separation"
      },
      {
        "a": "Xúc tác",
        "b": "Catalysis"
      },
      {
        "a": "Phản ứng trùng hợp",
        "b": "Polymerization"
      },
      {
        "a": "Sự đốt cháy",
        "b": "Combustion"
      },
      {
        "a": "Tinh chế",
        "b": "Refining"
      },
      {
        "a": "Trao đổi nhiệt",
        "b": "Heat Exchange"
      },
      {
        "a": "Sự lưu động hóa",
        "b": "Fluidization"
      },
      {
        "a": "Giải hấp",
        "b": "Desorption"
      },
      {
        "a": "Lò phản ứng/Thiết bị phản ứng",
        "b": "Reactor"
      },
      {
        "a": "Phóng đại quy mô",
        "b": "Scale-up"
      },
      {
        "a": "Thùng/Bồn phản ứng",
        "b": "Reactor Vessel"
      },
      {
        "a": "Tháp chưng cất",
        "b": "Distillation Column"
      },
      {
        "a": "Thiết bị trao đổi nhiệt",
        "b": "Heat Exchanger"
      },
      {
        "a": "Máy bơm",
        "b": "Pump"
      },
      {
        "a": "Van",
        "b": "Valve"
      },
      {
        "a": "Đường ống",
        "b": "Pipeline / Piping"
      },
      {
        "a": "Máy nén",
        "b": "Compressor"
      },
      {
        "a": "Máy khuấy",
        "b": "Agitator / Mixer"
      },
      {
        "a": "Máy lọc ép",
        "b": "Filter Press"
      },
      {
        "a": "Máy ly tâm",
        "b": "Centrifuge"
      },
      {
        "a": "Bồn chứa",
        "b": "Storage Tank"
      },
      {
        "a": "Quạt/Máy thổi",
        "b": "Blower / Fan"
      },
      {
        "a": "Nồi hơi",
        "b": "Boiler"
      },
      {
        "a": "Tháp giải nhiệt",
        "b": "Cooling Tower"
      },
      {
        "a": "Thiết bị đo lường",
        "b": "Instrumentation"
      },
      {
        "a": "Hệ thống điều khiển",
        "b": "Control System"
      },
      {
        "a": "Đồng hồ đo lưu lượng",
        "b": "Flowmeter"
      },
      {
        "a": "Áp kế",
        "b": "Manometer"
      },
      {
        "a": "Thiết bị tách",
        "b": "Separator"
      },
      {
        "a": "Mâm/Đĩa (trong tháp chưng cất)",
        "b": "Tray / Plate"
      },
      {
        "a": "Bảng dữ liệu an toàn hóa chất",
        "b": "Safety Data Sheet (SDS)"
      },
      {
        "a": "Ăn mòn",
        "b": "Corrosion"
      },
      {
        "a": "Cân bằng vật chất",
        "b": "Material Balance"
      },
      {
        "a": "Cân bằng năng lượng",
        "b": "Energy Balance"
      },
      {
        "a": "Nguy cơ/Mối nguy hiểm",
        "b": "Hazard"
      },
      {
        "a": "Xử lý nước thải",
        "b": "Wastewater Treatment"
      },
      {
        "a": "Kiểm soát ô nhiễm không khí",
        "b": "Air Pollution Control"
      },
      {
        "a": "Tối ưu hóa",
        "b": "Optimization"
      },
      {
        "a": "Nghiên cứu tính khả thi",
        "b": "Feasibility Study"
      },
      {
        "a": "Phân tích chi phí",
        "b": "Cost Analysis"
      },
      {
        "a": "Tốc độ phản ứng",
        "b": "reaction rate"
      },
      {
        "a": "Quy luật tốc độ",
        "b": "rate law"
      },
      {
        "a": "Cấp phản ứng",
        "b": "reaction order"
      },
      {
        "a": "Hằng số tốc độ",
        "b": "rate constant"
      },
      {
        "a": "Bậc giả",
        "b": "pseudo-order"
      },
      {
        "a": "Phản ứng bậc một",
        "b": "first-order reaction"
      },
      {
        "a": "Phản ứng bậc hai",
        "b": "second-order reaction"
      },
      {
        "a": "Phản ứng bậc không",
        "b": "zero-order reaction"
      },
      {
        "a": "Phản ứng bậc giả nhất",
        "b": "pseudo-first-order"
      },
      {
        "a": "Phản ứng chuỗi",
        "b": "chain reaction"
      },
      {
        "a": "Năng lượng hoạt hóa",
        "b": "activation energy"
      },
      {
        "a": "Tần số va chạm",
        "b": "collision frequency"
      },
      {
        "a": "Lý thuyết Arrhenius",
        "b": "Arrhenius equation"
      },
      {
        "a": "Hằng số tiền-exponential",
        "b": "pre-exponential factor"
      },
      {
        "a": "Cơ chế phản ứng",
        "b": "reaction mechanism"
      },
      {
        "a": "Trạng thái chuyển tiếp",
        "b": "transition state"
      },
      {
        "a": "Mặt năng lượng tiềm năng",
        "b": "potential energy surface"
      },
      {
        "a": "Chất xúc tác",
        "b": "catalyst"
      },
      {
        "a": "Độc chất xúc tác",
        "b": "catalyst poison"
      },
      {
        "a": "Hấp phụ",
        "b": "adsorption"
      },
      {
        "a": "Đẳng nhiệt hấp phụ",
        "b": "adsorption isotherm"
      },
      {
        "a": "Langmuir",
        "b": "Langmuir model"
      },
      {
        "a": "Freundlich",
        "b": "Freundlich model"
      },
      {
        "a": "Eley–Rideal",
        "b": "Eley–Rideal mechanism"
      },
      {
        "a": "Mặt hoạt tính",
        "b": "active site"
      },
      {
        "a": "Hạn tốc",
        "b": "rate-limiting step"
      },
      {
        "a": "Phân tích tuyến tính",
        "b": "linearization"
      },
      {
        "a": "Phù hợp đường cong",
        "b": "curve fitting"
      },
      {
        "a": "Phương trình vi phân",
        "b": "differential equation"
      },
      {
        "a": "Mô hình động học",
        "b": "kinetic model"
      },
      {
        "a": "Thời gian bán hủy",
        "b": "half-life"
      },
      {
        "a": "Hằng số phân rã",
        "b": "decay constant"
      },
      {
        "a": "Khuấy trộn ảnh hưởng",
        "b": "mixing effects"
      },
      {
        "a": "Cư trú thời gian",
        "b": "residence time"
      },
      {
        "a": "Nhiệt động học",
        "b": "thermodynamics"
      },
      {
        "a": "Trạng thái",
        "b": "state"
      },
      {
        "a": "Biến trạng thái",
        "b": "state variable"
      },
      {
        "a": "Hệ",
        "b": "system"
      },
      {
        "a": "Môi trường",
        "b": "surroundings"
      },
      {
        "a": "Công",
        "b": "work"
      },
      {
        "a": "Nhiệt",
        "b": "heat"
      },
      {
        "a": "Năng lượng nội tại",
        "b": "internal energy"
      },
      {
        "a": "Enthalpy",
        "b": "enthalpy"
      },
      {
        "a": "Entropy",
        "b": "entropy"
      },
      {
        "a": "Helmholtz năng lượng tự do",
        "b": "Helmholtz free energy"
      },
      {
        "a": "Gibbs năng lượng tự do",
        "b": "Gibbs free energy"
      },
      {
        "a": "Phương trình trạng thái",
        "b": "equation of state"
      },
      {
        "a": "Hằng số khí",
        "b": "gas constant"
      },
      {
        "a": "Nhiệt dung",
        "b": "heat capacity"
      },
      {
        "a": "Nhiệt dung riêng",
        "b": "specific heat capacity"
      },
      {
        "a": "Quá trình đẳng tích",
        "b": "isochoric process"
      },
      {
        "a": "Quá trình đẳng áp",
        "b": "isobaric process"
      },
      {
        "a": "Quá trình đẳng nhiệt",
        "b": "isothermal process"
      },
      {
        "a": "Quá trình đoạn nhiệt",
        "b": "adiabatic process"
      },
      {
        "a": "Cân bằng hóa học",
        "b": "chemical equilibrium"
      },
      {
        "a": "Hằng số cân bằng",
        "b": "equilibrium constant"
      },
      {
        "a": "Tiềm năng hóa học",
        "b": "chemical potential"
      },
      {
        "a": "Hoạt độ",
        "b": "activity"
      },
      {
        "a": "Hệ số hoạt độ",
        "b": "activity coefficient"
      },
      {
        "a": "Độ hòa tan",
        "b": "solubility"
      },
      {
        "a": "Áp suất hơi",
        "b": "vapor pressure"
      },
      {
        "a": "Nhiệt tạo thành",
        "b": "enthalpy of formation"
      },
      {
        "a": "Nhiệt phản ứng",
        "b": "enthalpy of reaction"
      },
      {
        "a": "Nhiệt dung mol",
        "b": "molar heat capacity"
      },
      {
        "a": "Hoạt độ ion",
        "b": "ionic strength"
      },
      {
        "a": "Độ hoạt hóa",
        "b": "fugacity"
      },
      {
        "a": "Độ tự do",
        "b": "degrees of freedom"
      },
      {
        "a": "Pha",
        "b": "phase"
      },
      {
        "a": "Đồ thị pha",
        "b": "phase diagram"
      },
      {
        "a": "Điểm ba",
        "b": "triple point"
      },
      {
        "a": "Điểm tới hạn",
        "b": "critical point"
      },
      {
        "a": "Trạng thái siêu tới hạn",
        "b": "supercritical state"
      },
      {
        "a": "Hỗn hợp lý tưởng",
        "b": "ideal solution"
      },
      {
        "a": "Định luật Raoult",
        "b": "Raoult’s law"
      },
      {
        "a": "Định luật Henry",
        "b": "Henry’s law"
      },
      {
        "a": "Hiệu ứng nhiệt",
        "b": "calorimetric effect"
      }
    ]
  },
  {
    "chuong": "Lab 1",
    "terms": [
      {
        "a": "Cốc thí nghiệm",
        "b": "beaker"
      },
      {
        "a": "Bình tam giác",
        "b": "Erlenmeyer flask"
      },
      {
        "a": "Bình cầu",
        "b": "round-bottom flask"
      },
      {
        "a": "Bình cổ dài",
        "b": "volumetric flask"
      },
      {
        "a": "Ống nghiệm",
        "b": "test tube"
      },
      {
        "a": "Ống đong",
        "b": "graduated cylinder"
      },
      {
        "a": "Pipet thẳng",
        "b": "volumetric pipette"
      },
      {
        "a": "Pipet chia vạch",
        "b": "graduated pipette"
      },
      {
        "a": "Micropipet",
        "b": "micropipette"
      },
      {
        "a": "Buret",
        "b": "burette"
      },
      {
        "a": "Phễu thủy tinh",
        "b": "glass funnel"
      },
      {
        "a": "Phễu chiết",
        "b": "separatory funnel"
      },
      {
        "a": "Giá ống nghiệm",
        "b": "test tube rack"
      },
      {
        "a": "Kẹp ống nghiệm",
        "b": "test tube holder"
      },
      {
        "a": "Kẹp bình",
        "b": "clamp"
      },
      {
        "a": "Chân đế thí nghiệm",
        "b": "ring stand"
      },
      {
        "a": "Vòng kim loại",
        "b": "iron ring"
      },
      {
        "a": "Lưới amiăng",
        "b": "wire gauze"
      },
      {
        "a": "Đèn cồn",
        "b": "alcohol burner"
      },
      {
        "a": "Đèn Bunsen",
        "b": "Bunsen burner"
      },
      {
        "a": "Bếp điện",
        "b": "hot plate"
      },
      {
        "a": "Bếp khuấy từ",
        "b": "magnetic stirrer"
      },
      {
        "a": "Thanh khuấy",
        "b": "stir bar"
      },
      {
        "a": "Máy khuấy",
        "b": "overhead stirrer"
      },
      {
        "a": "Máy lắc",
        "b": "orbital shaker"
      },
      {
        "a": "Máy ly tâm",
        "b": "centrifuge"
      },
      {
        "a": "Rotor ly tâm",
        "b": "rotor"
      },
      {
        "a": "Tủ sấy",
        "b": "drying oven"
      },
      {
        "a": "Tủ hút",
        "b": "fume hood"
      },
      {
        "a": "Tủ khí trơ",
        "b": "glove box"
      },
      {
        "a": "Tủ lạnh âm sâu",
        "b": "deep freezer"
      },
      {
        "a": "Tủ ủ nhiệt",
        "b": "incubator"
      },
      {
        "a": "Nồi cách thủy",
        "b": "water bath"
      },
      {
        "a": "Máy đo pH",
        "b": "pH meter"
      },
      {
        "a": "Điện cực pH",
        "b": "pH electrode"
      },
      {
        "a": "Máy đo dẫn điện",
        "b": "conductivity meter"
      },
      {
        "a": "Máy đo thế zeta",
        "b": "zeta potential analyzer"
      },
      {
        "a": "Cân phân tích",
        "b": "analytical balance"
      },
      {
        "a": "Cân kỹ thuật",
        "b": "top-loading balance"
      },
      {
        "a": "Tủ sấy chân không",
        "b": "vacuum oven"
      },
      {
        "a": "Bơm chân không",
        "b": "vacuum pump"
      },
      {
        "a": "Hệ lọc chân không",
        "b": "vacuum filtration setup"
      },
      {
        "a": "Phễu Büchner",
        "b": "Büchner funnel"
      },
      {
        "a": "Bình lọc",
        "b": "filtering flask"
      },
      {
        "a": "Giấy lọc",
        "b": "filter paper"
      },
      {
        "a": "Cột sắc ký",
        "b": "chromatography column"
      },
      {
        "a": "Máy HPLC",
        "b": "HPLC system"
      },
      {
        "a": "Máy GC",
        "b": "GC system"
      },
      {
        "a": "GC-MS",
        "b": "GC–MS"
      },
      {
        "a": "LC-MS",
        "b": "LC–MS"
      },
      {
        "a": "Khối phổ kế",
        "b": "mass spectrometer"
      },
      {
        "a": "Máy quang phổ UV-Vis",
        "b": "UV–Vis spectrophotometer"
      },
      {
        "a": "Máy FTIR",
        "b": "FTIR spectrometer"
      },
      {
        "a": "Máy Raman",
        "b": "Raman spectrometer"
      },
      {
        "a": "XRD",
        "b": "X-ray diffraction (XRD)"
      },
      {
        "a": "SEM",
        "b": "scanning electron microscope"
      },
      {
        "a": "TEM",
        "b": "transmission electron microscope"
      },
      {
        "a": "TGA",
        "b": "thermogravimetric analysis (TGA)"
      },
      {
        "a": "DSC",
        "b": "differential scanning calorimetry (DSC)"
      },
      {
        "a": "DTA",
        "b": "differential thermal analysis (DTA)"
      },
      {
        "a": "BET",
        "b": "BET surface area analyzer"
      },
      {
        "a": "Máy đo kích thước hạt",
        "b": "particle size analyzer"
      },
      {
        "a": "Đo zeta",
        "b": "zeta potential"
      },
      {
        "a": "Tủ sấy mẫu",
        "b": "sample dryer"
      },
      {
        "a": "Đĩa petri",
        "b": "Petri dish"
      },
      {
        "a": "Ống mao quản",
        "b": "capillary tube"
      },
      {
        "a": "Bơm chiết",
        "b": "peristaltic pump"
      },
      {
        "a": "Máy siêu âm",
        "b": "ultrasonic bath"
      },
      {
        "a": "Máy nghiền bi",
        "b": "ball mill"
      },
      {
        "a": "Máy nghiền hành tinh",
        "b": "planetary ball mill"
      },
      {
        "a": "Cột sấy",
        "b": "desiccator"
      },
      {
        "a": "Hạt hút ẩm",
        "b": "desiccant"
      },
      {
        "a": "Vật liệu chuẩn",
        "b": "standard reference material"
      },
      {
        "a": "Chai thuốc thử",
        "b": "reagent bottle"
      },
      {
        "a": "Chai đựng dung môi",
        "b": "solvent bottle"
      },
      {
        "a": "Ống tiêm",
        "b": "syringe"
      },
      {
        "a": "Kim tiêm",
        "b": "needle"
      },
      {
        "a": "Cốc có mỏ",
        "b": "beaker with spout"
      },
      {
        "a": "Vạch mức",
        "b": "calibration mark"
      },
      {
        "a": "Nắp vặn",
        "b": "screw cap"
      },
      {
        "a": "Nắp nhựa",
        "b": "plastic cap"
      },
      {
        "a": "Đầu lọc",
        "b": "filter tip"
      },
      {
        "a": "Dụng cụ lấy mẫu",
        "b": "sampler"
      },
      {
        "a": "Dao cắt mẫu",
        "b": "spatula"
      },
      {
        "a": "Thìa thủy tinh",
        "b": "glass scoop"
      },
      {
        "a": "Khay cân",
        "b": "weighing boat"
      },
      {
        "a": "Giấy bạc",
        "b": "aluminum foil"
      },
      {
        "a": "Nắp septum",
        "b": "septum cap"
      },
      {
        "a": "Ống NMR",
        "b": "NMR tube"
      },
      {
        "a": "Máy NMR",
        "b": "NMR spectrometer"
      },
      {
        "a": "Máy XPS",
        "b": "XPS analyzer"
      },
      {
        "a": "Súng phun",
        "b": "spray gun"
      },
      {
        "a": "Lò nung",
        "b": "muffle furnace"
      },
      {
        "a": "Ống thổi khí",
        "b": "gas inlet tube"
      },
      {
        "a": "Đầu thoát khí",
        "b": "gas outlet adapter"
      },
      {
        "a": "Cảm biến nhiệt",
        "b": "thermocouple"
      },
      {
        "a": "Nhiệt kế",
        "b": "thermometer"
      },
      {
        "a": "Máy đo áp suất",
        "b": "pressure gauge"
      },
      {
        "a": "Vali mẫu",
        "b": "sample vial"
      },
      {
        "a": "Nút cao su",
        "b": "rubber stopper"
      },
      {
        "a": "Nút thủy tinh",
        "b": "glass stopper"
      },
      {
        "a": "Đầu nối",
        "b": "adapter"
      },
      {
        "a": "Ống nối chữ Y",
        "b": "Y-adapter"
      },
      {
        "a": "Ống đong nhỏ giọt",
        "b": "dropping pipette"
      },
      {
        "a": "Ống sinh hàn",
        "b": "condenser"
      },
      {
        "a": "Sinh hàn hồi lưu",
        "b": "reflux condenser"
      },
      {
        "a": "Lọ sắc ký",
        "b": "vial (chromatography)"
      },
      {
        "a": "Máy siêu sạch",
        "b": "laminar flow hood"
      },
      {
        "a": "Buồng sơn phủ",
        "b": "spin coater"
      },
      {
        "a": "Máy đo độ nhớt",
        "b": "viscometer"
      },
      {
        "a": "Bơm tiêm tự động",
        "b": "autosampler"
      },
      {
        "a": "Dung môi",
        "b": "solvent"
      },
      {
        "a": "Chất tan",
        "b": "solute"
      },
      {
        "a": "Dung dịch",
        "b": "solution"
      },
      {
        "a": "Hỗn hợp",
        "b": "mixture"
      },
      {
        "a": "Huyền phù",
        "b": "suspension"
      },
      {
        "a": "Keo",
        "b": "colloid"
      },
      {
        "a": "Nhũ tương",
        "b": "emulsion"
      },
      {
        "a": "Axit",
        "b": "acid"
      },
      {
        "a": "Bazơ",
        "b": "base"
      },
      {
        "a": "Muối",
        "b": "salt"
      },
      {
        "a": "Oxy hóa",
        "b": "oxidation"
      },
      {
        "a": "Khử",
        "b": "reduction"
      },
      {
        "a": "Thủy phân",
        "b": "hydrolysis"
      },
      {
        "a": "Ngưng tụ",
        "b": "condensation"
      },
      {
        "a": "Trùng hợp",
        "b": "polymerization"
      },
      {
        "a": "Monome",
        "b": "monomer"
      }
    ]
  },
  {
    "chuong": "Lab 2",
    "terms": [
      {
        "a": "Polyme",
        "b": "polymer"
      },
      {
        "a": "Copolyme",
        "b": "copolymer"
      },
      {
        "a": "Xúc tiến",
        "b": "promoter"
      },
      {
        "a": "Ức chế",
        "b": "inhibitor"
      },
      {
        "a": "Hoạt tính",
        "b": "activity"
      },
      {
        "a": "pH trung tính",
        "b": "neutral pH"
      },
      {
        "a": "Điểm đẳng điện",
        "b": "isoelectric point"
      },
      {
        "a": "Điện giải",
        "b": "electrolyte"
      },
      {
        "a": "Dòng điện",
        "b": "electric current"
      },
      {
        "a": "Điện thế",
        "b": "potential"
      },
      {
        "a": "Điện cực",
        "b": "electrode"
      },
      {
        "a": "Anot",
        "b": "anode"
      },
      {
        "a": "Catot",
        "b": "cathode"
      },
      {
        "a": "Phản ứng điện hóa",
        "b": "electrochemical reaction"
      },
      {
        "a": "Điện phân",
        "b": "electrolysis"
      },
      {
        "a": "Pin Galvanic",
        "b": "galvanic cell"
      },
      {
        "a": "Dòng thế",
        "b": "polarization"
      },
      {
        "a": "Chuyển điện tích",
        "b": "charge transfer"
      },
      {
        "a": "Hấp thụ UV",
        "b": "UV absorption"
      },
      {
        "a": "Phát xạ",
        "b": "emission"
      },
      {
        "a": "Huỳnh quang",
        "b": "fluorescence"
      },
      {
        "a": "Lân quang",
        "b": "phosphorescence"
      },
      {
        "a": "Bước sóng",
        "b": "wavelength"
      },
      {
        "a": "Cường độ",
        "b": "intensity"
      },
      {
        "a": "Độ đục",
        "b": "turbidity"
      },
      {
        "a": "Độ nhớt",
        "b": "viscosity"
      },
      {
        "a": "Tỷ trọng",
        "b": "density"
      },
      {
        "a": "Diện tích bề mặt",
        "b": "surface area"
      },
      {
        "a": "Kích thước hạt",
        "b": "particle size"
      },
      {
        "a": "Phân bố kích thước",
        "b": "size distribution"
      },
      {
        "a": "Tính thấm",
        "b": "permeability"
      },
      {
        "a": "Hằng số cân bằng",
        "b": "equilibrium constant (K)"
      },
      {
        "a": "Hằng số tốc độ",
        "b": "rate constant (k)"
      },
      {
        "a": "Năng lượng Gibbs",
        "b": "Gibbs energy"
      },
      {
        "a": "Tiêu chuẩn ISO",
        "b": "ISO standard"
      },
      {
        "a": "GLP",
        "b": "good laboratory practice"
      },
      {
        "a": "GMP",
        "b": "good manufacturing practice"
      },
      {
        "a": "Chuẩn bị dung môi",
        "b": "solvent preparation"
      },
      {
        "a": "Khả năng hấp phụ",
        "b": "adsorption capacity"
      },
      {
        "a": "Động học giả",
        "b": "pseudo-kinetics"
      },
      {
        "a": "Mô hình Langmuir–Hinshelwood",
        "b": "Langmuir–Hinshelwood mechanism"
      },
      {
        "a": "Phân tích EIS",
        "b": "electrochemical impedance spectroscopy (EIS)"
      },
      {
        "a": "Chuẩn hóa dữ liệu",
        "b": "data normalization"
      },
      {
        "a": "Hiệu chỉnh đường nền",
        "b": "baseline correction"
      },
      {
        "a": "Nhiễu",
        "b": "noise"
      },
      {
        "a": "Tỷ lệ tín hiệu/nhiễu",
        "b": "signal-to-noise ratio"
      },
      {
        "a": "Độ nhạy",
        "b": "sensitivity"
      },
      {
        "a": "Độ chọn lọc",
        "b": "selectivity"
      },
      {
        "a": "Dải tuyến tính",
        "b": "linear range"
      },
      {
        "a": "Hệ số khuếch tán",
        "b": "diffusion coefficient"
      },
      {
        "a": "Hệ số chuyển khối",
        "b": "mass transfer coefficient"
      },
      {
        "a": "Đường cong Arrhenius",
        "b": "Arrhenius plot"
      },
      {
        "a": "Phân tích lỗi",
        "b": "error analysis"
      },
      {
        "a": "Sai số tương đối",
        "b": "relative error"
      },
      {
        "a": "Sai số tuyệt đối",
        "b": "absolute error"
      },
      {
        "a": "Độ tin cậy",
        "b": "confidence level"
      },
      {
        "a": "Khoảng tin cậy",
        "b": "confidence interval"
      },
      {
        "a": "Kiểm định giả thuyết",
        "b": "hypothesis testing"
      },
      {
        "a": "Hệ xúc tác dị thể",
        "b": "heterogeneous catalysis"
      },
      {
        "a": "Hệ xúc tác đồng thể",
        "b": "homogeneous catalysis"
      },
      {
        "a": "Bề mặt hoạt tính",
        "b": "active surface"
      },
      {
        "a": "Phân hủy",
        "b": "decomposition"
      },
      {
        "a": "Oxy hóa nâng cao",
        "b": "advanced oxidation"
      },
      {
        "a": "Hấp phụ vật lý",
        "b": "physisorption"
      },
      {
        "a": "Hấp phụ hóa học",
        "b": "chemisorption"
      },
      {
        "a": "Cân",
        "b": "weighing"
      },
      {
        "a": "Hòa tan",
        "b": "dissolution"
      },
      {
        "a": "Pha dung dịch",
        "b": "solution preparation"
      },
      {
        "a": "Pha đệm",
        "b": "buffer preparation"
      },
      {
        "a": "Hiệu chuẩn",
        "b": "calibration"
      },
      {
        "a": "Định chuẩn",
        "b": "standardization"
      },
      {
        "a": "Chuẩn độ",
        "b": "titration"
      },
      {
        "a": "Điểm tương đương",
        "b": "equivalence point"
      },
      {
        "a": "Điểm cuối",
        "b": "end point"
      },
      {
        "a": "Lọc",
        "b": "filtration"
      },
      {
        "a": "Ly tâm",
        "b": "centrifugation"
      },
      {
        "a": "Chiết",
        "b": "extraction"
      },
      {
        "a": "Chiết lỏng–lỏng",
        "b": "liquid–liquid extraction"
      },
      {
        "a": "Rửa",
        "b": "washing"
      },
      {
        "a": "Sấy",
        "b": "drying"
      },
      {
        "a": "Cô đặc",
        "b": "concentration"
      },
      {
        "a": "Bay hơi",
        "b": "evaporation"
      },
      {
        "a": "Chưng cất",
        "b": "distillation"
      },
      {
        "a": "Chưng cất đơn giản",
        "b": "simple distillation"
      },
      {
        "a": "Chưng cất phân đoạn",
        "b": "fractional distillation"
      },
      {
        "a": "Hồi lưu",
        "b": "reflux"
      },
      {
        "a": "Kết tinh",
        "b": "crystallization"
      },
      {
        "a": "Tái kết tinh",
        "b": "recrystallization"
      },
      {
        "a": "Sắc ký lớp mỏng",
        "b": "thin-layer chromatography (TLC)"
      },
      {
        "a": "Sắc ký cột",
        "b": "column chromatography"
      },
      {
        "a": "Điểm nóng chảy",
        "b": "melting point"
      },
      {
        "a": "Điểm sôi",
        "b": "boiling point"
      },
      {
        "a": "Chuẩn bị mẫu",
        "b": "sample preparation"
      },
      {
        "a": "Nghiền",
        "b": "grinding"
      },
      {
        "a": "Sàng",
        "b": "sieving"
      },
      {
        "a": "Đo độ pH",
        "b": "pH measurement"
      },
      {
        "a": "Đo độ dẫn điện",
        "b": "conductivity measurement"
      },
      {
        "a": "Đo hấp thụ",
        "b": "absorbance measurement"
      },
      {
        "a": "Chuẩn đường nền",
        "b": "baseline correction"
      },
      {
        "a": "Khử khí",
        "b": "degassing"
      },
      {
        "a": "Trao đổi ion",
        "b": "ion exchange"
      },
      {
        "a": "Thẩm thấu",
        "b": "dialysis"
      },
      {
        "a": "Thẩm tách",
        "b": "pervaporation"
      },
      {
        "a": "Siêu lọc",
        "b": "ultrafiltration"
      },
      {
        "a": "Lọc màng",
        "b": "membrane filtration"
      },
      {
        "a": "Ủ nhiệt",
        "b": "incubation"
      },
      {
        "a": "Ủ siêu âm",
        "b": "sonication"
      },
      {
        "a": "Phản ứng tổng hợp",
        "b": "synthesis reaction"
      },
      {
        "a": "Phản ứng oxy hóa",
        "b": "oxidation reaction"
      },
      {
        "a": "Phản ứng khử",
        "b": "reduction reaction"
      },
      {
        "a": "Trao đổi ligand",
        "b": "ligand exchange"
      },
      {
        "a": "Hoạt hóa bề mặt",
        "b": "surface activation"
      },
      {
        "a": "Biến tính",
        "b": "modification"
      },
      {
        "a": "Chức năng hóa",
        "b": "functionalization"
      },
      {
        "a": "Đồng kết tủa",
        "b": "co-precipitation"
      },
      {
        "a": "Sol–gel",
        "b": "sol–gel processing"
      },
      {
        "a": "Ủ nhiệt độ",
        "b": "thermal annealing"
      },
      {
        "a": "Hoàn nguyên",
        "b": "regeneration"
      },
      {
        "a": "Hoạt hóa axit",
        "b": "acid activation"
      },
      {
        "a": "Hoạt hóa kiềm",
        "b": "base activation"
      },
      {
        "a": "Rửa bề mặt",
        "b": "surface washing"
      },
      {
        "a": "Phân tích nhiệt",
        "b": "thermal analysis"
      },
      {
        "a": "Phân tích khối phổ",
        "b": "mass spectrometry"
      },
      {
        "a": "Quang phổ hấp thụ",
        "b": "absorption spectroscopy"
      },
      {
        "a": "Quang phổ phát xạ",
        "b": "emission spectroscopy"
      },
      {
        "a": "Chuẩn ngoại",
        "b": "external standard"
      },
      {
        "a": "Chuẩn nội",
        "b": "internal standard"
      }
    ]
  },
  {
    "chuong": "Lab 3",
    "terms": [
      {
        "a": "Đường chuẩn",
        "b": "calibration curve"
      },
      {
        "a": "Giới hạn phát hiện",
        "b": "limit of detection"
      },
      {
        "a": "Giới hạn định lượng",
        "b": "limit of quantitation"
      },
      {
        "a": "Độ thu hồi",
        "b": "recovery"
      },
      {
        "a": "Độ lặp lại",
        "b": "repeatability"
      },
      {
        "a": "Độ tái lập",
        "b": "reproducibility"
      },
      {
        "a": "Độ không đảm bảo",
        "b": "measurement uncertainty"
      },
      {
        "a": "Kiểm soát chất lượng",
        "b": "quality control"
      },
      {
        "a": "Đảm bảo chất lượng",
        "b": "quality assurance"
      },
      {
        "a": "SOP",
        "b": "standard operating procedure"
      },
      {
        "a": "Ghi nhật ký",
        "b": "log recording"
      },
      {
        "a": "Truy xuất nguồn gốc",
        "b": "traceability"
      },
      {
        "a": "Trang bị bảo hộ",
        "b": "personal protective equipment (PPE)"
      },
      {
        "a": "Áo khoác phòng thí nghiệm",
        "b": "lab coat"
      },
      {
        "a": "Găng tay",
        "b": "gloves"
      },
      {
        "a": "Kính bảo hộ",
        "b": "safety goggles"
      },
      {
        "a": "Tấm che mặt",
        "b": "face shield"
      },
      {
        "a": "Mặt nạ",
        "b": "respirator"
      },
      {
        "a": "Biển cảnh báo",
        "b": "warning sign"
      },
      {
        "a": "Phiếu an toàn hóa chất",
        "b": "safety data sheet (SDS)"
      },
      {
        "a": "Pha loãng",
        "b": "dilution"
      },
      {
        "a": "Thải bỏ chất thải",
        "b": "waste disposal"
      },
      {
        "a": "Phân loại rác",
        "b": "waste segregation"
      },
      {
        "a": "Hỏa hoạn",
        "b": "fire hazard"
      },
      {
        "a": "Độc tính",
        "b": "toxicity"
      },
      {
        "a": "Ăn mòn",
        "b": "corrosivity"
      },
      {
        "a": "Dễ cháy",
        "b": "flammability"
      },
      {
        "a": "Oxy hóa mạnh",
        "b": "strong oxidizer"
      },
      {
        "a": "Bất hoạt sinh học",
        "b": "decontamination"
      },
      {
        "a": "Khử trùng",
        "b": "disinfection"
      },
      {
        "a": "Tiệt trùng",
        "b": "sterilization"
      },
      {
        "a": "Quy trình khẩn cấp",
        "b": "emergency procedure"
      },
      {
        "a": "Tập huấn",
        "b": "training"
      },
      {
        "a": "Kiểm định thiết bị",
        "b": "equipment qualification"
      },
      {
        "a": "Xác nhận phương pháp",
        "b": "method validation"
      },
      {
        "a": "Kiểm tra hiệu năng",
        "b": "performance check"
      },
      {
        "a": "Mẫu trắng",
        "b": "blank sample"
      },
      {
        "a": "Mẫu chuẩn",
        "b": "standard sample"
      },
      {
        "a": "Mẫu đối chứng",
        "b": "control sample"
      },
      {
        "a": "Sai số hệ thống",
        "b": "systematic error"
      },
      {
        "a": "Sai số ngẫu nhiên",
        "b": "random error"
      },
      {
        "a": "Độ chính xác",
        "b": "accuracy"
      },
      {
        "a": "Độ chụm",
        "b": "precision"
      },
      {
        "a": "Ngưỡng cảnh báo",
        "b": "alert limit"
      },
      {
        "a": "Ngưỡng hành động",
        "b": "action limit"
      },
      {
        "a": "Truy xuất tài liệu",
        "b": "document traceability"
      },
      {
        "a": "Pipet định mức",
        "b": "volumetric pipette"
      },
      {
        "a": "Lấy mẫu đại diện",
        "b": "representative sampling"
      },
      {
        "a": "Nghiền mịn",
        "b": "grinding"
      },
      {
        "a": "Đồng nhất mẫu",
        "b": "homogenization"
      },
      {
        "a": "Sấy khô",
        "b": "drying"
      },
      {
        "a": "Hợp chất",
        "b": "compound"
      },
      {
        "a": "Phân tích định lượng",
        "b": "quantitative analysis"
      },
      {
        "a": "Phân tích định tính",
        "b": "qualitative analysis"
      },
      {
        "a": "Giới hạn phát hiện",
        "b": "limit of detection (LOD)"
      },
      {
        "a": "Giới hạn định lượng",
        "b": "limit of quantification (LOQ)"
      },
      {
        "a": "Độ đúng",
        "b": "trueness"
      },
      {
        "a": "Kiểm soát chất lượng",
        "b": "quality control (QC)"
      },
      {
        "a": "Đảm bảo chất lượng",
        "b": "quality assurance (QA)"
      },
      {
        "a": "SOP (quy trình chuẩn)",
        "b": "standard operating procedure (SOP)"
      },
      {
        "a": "Hồ sơ lô",
        "b": "batch record"
      },
      {
        "a": "Phổ hấp thụ",
        "b": "absorption spectrum"
      },
      {
        "a": "Phổ phát xạ",
        "b": "emission spectrum"
      },
      {
        "a": "Phổ hồng ngoại",
        "b": "infrared spectrum"
      },
      {
        "a": "Phổ Raman",
        "b": "Raman spectroscopy"
      },
      {
        "a": "Phổ khối",
        "b": "mass spectrum"
      },
      {
        "a": "Giới hạn phát hiện phương pháp",
        "b": "method detection limit (MDL)"
      },
      {
        "a": "Đường nền",
        "b": "baseline"
      },
      {
        "a": "Hiệu chỉnh nền",
        "b": "baseline correction"
      },
      {
        "a": "Nâng cao tín hiệu",
        "b": "signal enhancement"
      },
      {
        "a": "Tách sóng",
        "b": "demodulation"
      },
      {
        "a": "Tối ưu phương pháp",
        "b": "method optimization"
      },
      {
        "a": "Chuyển giao phương pháp",
        "b": "method transfer"
      },
      {
        "a": "Xác nhận cắt ngang",
        "b": "cross-validation"
      },
      {
        "a": "Kiểm tra đường nền",
        "b": "background check"
      },
      {
        "a": "Khả năng phát hiện",
        "b": "detectability"
      },
      {
        "a": "Ngưỡng tín hiệu–nhiễu",
        "b": "signal-to-noise ratio (SNR)"
      },
      {
        "a": "Lọc số liệu",
        "b": "data filtering"
      },
      {
        "a": "Làm mịn dữ liệu",
        "b": "data smoothing"
      },
      {
        "a": "Tách pic chồng lấn",
        "b": "deconvolution"
      },
      {
        "a": "Chuẩn hóa tín hiệu",
        "b": "signal normalization"
      },
      {
        "a": "Sắc ký pha đảo",
        "b": "reversed-phase chromatography"
      },
      {
        "a": "Sắc ký pha thường",
        "b": "normal-phase chromatography"
      },
      {
        "a": "Sắc ký trao đổi ion",
        "b": "ion-exchange chromatography"
      },
      {
        "a": "Sắc ký kích thước",
        "b": "size-exclusion chromatography"
      },
      {
        "a": "SS/WS (rắn/tan trong nước)",
        "b": "solid/water-soluble"
      },
      {
        "a": "Hệ số phân bố",
        "b": "partition coefficient"
      },
      {
        "a": "Thời gian chết",
        "b": "dead time"
      },
      {
        "a": "Dòng mang",
        "b": "carrier gas"
      },
      {
        "a": "Tốc độ dòng",
        "b": "flow rate"
      },
      {
        "a": "Nhiệt độ cột",
        "b": "column temperature"
      },
      {
        "a": "Khí làm sạch",
        "b": "make-up gas"
      },
      {
        "a": "Điều chế gradient",
        "b": "gradient elution"
      },
      {
        "a": "Dung môi pha động",
        "b": "mobile phase"
      },
      {
        "a": "Pha tĩnh",
        "b": "stationary phase"
      },
      {
        "a": "Trễ hệ thống",
        "b": "system suitability"
      },
      {
        "a": "Kiểm tra độ phù hợp hệ thống",
        "b": "system suitability test"
      },
      {
        "a": "Chuẩn hóa phương pháp",
        "b": "method standardization"
      },
      {
        "a": "Bản thuyết minh phương pháp",
        "b": "method description"
      },
      {
        "a": "Kế hoạch thẩm định",
        "b": "validation plan"
      },
      {
        "a": "Độ lặp",
        "b": "repeatability"
      },
      {
        "a": "Độ lệch chuẩn",
        "b": "standard deviation"
      },
      {
        "a": "Hệ số tương quan",
        "b": "correlation coefficient"
      },
      {
        "a": "Hệ số hồi quy",
        "b": "regression coefficient"
      },
      {
        "a": "R²",
        "b": "coefficient of determination (R-squared)"
      },
      {
        "a": "Phục hồi",
        "b": "recovery"
      },
      {
        "a": "Thêm chuẩn",
        "b": "standard addition"
      },
      {
        "a": "Kiểm tra ma trận",
        "b": "matrix effect"
      },
      {
        "a": "Giới hạn báo cáo",
        "b": "reporting limit"
      },
      {
        "a": "Độ tuyến tính",
        "b": "linearity"
      },
      {
        "a": "Nhiễu nền",
        "b": "baseline noise"
      },
      {
        "a": "Độ phân giải",
        "b": "resolution"
      },
      {
        "a": "Thời gian lưu",
        "b": "retention time"
      },
      {
        "a": "Diện tích pic",
        "b": "peak area"
      },
      {
        "a": "Chiều cao pic",
        "b": "peak height"
      },
      {
        "a": "Giải hấp",
        "b": "desorption"
      },
      {
        "a": "Phân tách",
        "b": "separation"
      },
      {
        "a": "Đồng phân",
        "b": "isomer"
      },
      {
        "a": "Chuẩn phương pháp",
        "b": "method standardization"
      },
      {
        "a": "Xác nhận phương pháp",
        "b": "method verification"
      },
      {
        "a": "Thẩm định phương pháp",
        "b": "method validation"
      },
      {
        "a": "Độ bền tín hiệu",
        "b": "signal stability"
      },
      {
        "a": "Nhiễu liên hợp",
        "b": "interferences"
      },
      {
        "a": "Độ lập lại đường chuẩn",
        "b": "calibration repeatability"
      },
      {
        "a": "Khoảng làm việc",
        "b": "working range"
      },
      {
        "a": "Độ mở rộng không chắc chắn",
        "b": "expanded uncertainty"
      }
    ]
  },
  {
    "chuong": "Chemicals",
    "terms": [
      {
        "a": "Hydrogen",
        "b": "/ˈhaɪ.drə.dʒən/"
      },
      {
        "a": "Carbon",
        "b": "/ˈkɑːr.bən/"
      },
      {
        "a": "Nitrogen",
        "b": "/ˈnaɪ.trə.dʒən/"
      },
      {
        "a": "Oxygen",
        "b": "/ˈɒk.sɪ.dʒən/"
      },
      {
        "a": "Fluorine",
        "b": "/ˈflʊə.riːn/ hoặc /ˈflɔːr.iːn/"
      },
      {
        "a": "Chlorine",
        "b": "/ˈklɔːr.iːn/"
      },
      {
        "a": "Bromine",
        "b": "/ˈbroʊ.miːn/"
      },
      {
        "a": "Iodine",
        "b": "/ˈaɪ.ə.daɪn/ hoặc /ˈaɪ.ə.diːn/"
      },
      {
        "a": "Phosphorus",
        "b": "/ˈfɒs.fər.əs/"
      },
      {
        "a": "Sulfur",
        "b": "/ˈsʌl.fər/"
      },
      {
        "a": "Silicon",
        "b": "/ˈsɪl.ɪ.kən/"
      },
      {
        "a": "Boron",
        "b": "/ˈbɔː.rɒn/"
      },
      {
        "a": "Sodium",
        "b": "/ˈsoʊ.di.əm/"
      },
      {
        "a": "Potassium",
        "b": "/pəˈtæs.i.əm/"
      },
      {
        "a": "Magnesium",
        "b": "/mæɡˈniː.zi.əm/"
      },
      {
        "a": "Calcium",
        "b": "/ˈkæl.si.əm/"
      },
      {
        "a": "Barium",
        "b": "/ˈbeə.ri.əm/"
      },
      {
        "a": "Titanium",
        "b": "/taɪˈteɪ.ni.əm/"
      },
      {
        "a": "Zirconium",
        "b": "/zɜːrˈkoʊ.ni.əm/"
      },
      {
        "a": "Niobium",
        "b": "/naɪˈoʊ.bi.əm/"
      },
      {
        "a": "Vanadium",
        "b": "/vəˈneɪ.di.əm/"
      },
      {
        "a": "Chromium",
        "b": "/ˈkroʊ.mi.əm/"
      },
      {
        "a": "Manganese",
        "b": "/ˈmæŋ.ɡəˌniːz/"
      },
      {
        "a": "Iron",
        "b": "/ˈaɪ.ərn/"
      },
      {
        "a": "Cobalt",
        "b": "/ˈkoʊ.bɔːlt/"
      },
      {
        "a": "Nickel",
        "b": "/ˈnɪk.əl/"
      },
      {
        "a": "Copper",
        "b": "/ˈkɒp.ər/"
      },
      {
        "a": "Zinc",
        "b": "/zɪŋk/"
      },
      {
        "a": "Arsenic",
        "b": "/ˈɑːr.sə.nɪk/"
      },
      {
        "a": "Selenium",
        "b": "/səˈliː.ni.əm/"
      },
      {
        "a": "Silver",
        "b": "/ˈsɪl.vər/"
      },
      {
        "a": "Gold",
        "b": "/ɡoʊld/"
      },
      {
        "a": "Mercury",
        "b": "/ˈmɜːr.kjəri/"
      },
      {
        "a": "Lead",
        "b": "/lɛd/"
      },
      {
        "a": "Tin",
        "b": "/tɪn/"
      },
      {
        "a": "Aluminum",
        "b": "/əˈluː.mə.nəm/ (US) hoặc /ˌæl.jʊˈmɪn.i.əm/ (UK)"
      },
      {
        "a": "Platinum",
        "b": "/ˈplæt.ɪ.nəm/"
      },
      {
        "a": "Palladium",
        "b": "/pəˈleɪ.di.əm/"
      },
      {
        "a": "Uranium",
        "b": "/jʊˈreɪ.ni.əm/"
      },
      {
        "a": "Neon",
        "b": "/ˈniː.ɒn/"
      },
      {
        "a": "Butadiene",
        "b": "/ˌbjuːtəˈdaɪ.iːn/"
      },
      {
        "a": "Cyclohexane",
        "b": "/ˌsaɪkloʊˈhɛkseɪn/"
      },
      {
        "a": "Hexane",
        "b": "/ˈhɛkseɪn/"
      },
      {
        "a": "Heptane",
        "b": "/ˈhɛpteɪn/"
      },
      {
        "a": "Octane",
        "b": "/ˈɒkteɪn/"
      },
      {
        "a": "Naphthalene",
        "b": "/ˈnæfθəˌliːn/"
      },
      {
        "a": "Anthracene",
        "b": "/ˈænθrəˌsiːn/"
      },
      {
        "a": "Pyridine",
        "b": "/ˈpɪrɪˌdiːn/"
      },
      {
        "a": "Furan",
        "b": "/ˈfjʊəræn/"
      },
      {
        "a": "Tetrahydrofuran (THF)",
        "b": "/ˌtɛtrəˌhaɪdroʊˈfjʊəræn/"
      },
      {
        "a": "Dimethyl Sulfoxide (DMSO)",
        "b": "/daɪˈmɛθəl ˈsʌlfɒksaɪd/"
      },
      {
        "a": "Acrylonitrile",
        "b": "/əˈkraɪloʊˌnaɪtraɪl/"
      },
      {
        "a": "Methyl Methacrylate (MMA)",
        "b": "/ˈmɛθəl ˌmɛθəˈkraɪleɪt/"
      },
      {
        "a": "Butanol",
        "b": "/ˈbjuːtənɒl/"
      },
      {
        "a": "Dichloromethane",
        "b": "/daɪˌklɔːroʊˈmiːθeɪn/"
      },
      {
        "a": "Chloroform",
        "b": "/ˈklɔːrəˌfɔːrm/"
      },
      {
        "a": "Carbon Tetrachloride",
        "b": "/ˈkɑːrbən ˌtɛtrəˈklɔːraɪd/"
      },
      {
        "a": "Ethyl Acetate",
        "b": "/ˈɛθəl ˈæsɪˌteɪt/"
      },
      {
        "a": "Butyl Acetate",
        "b": "/ˈbjuːtəl ˈæsɪˌteɪt/"
      },
      {
        "a": "Dimethylformamide (DMF)",
        "b": "/daɪˈmɛθəlˈfɔːrməˌmaɪd/"
      },
      {
        "a": "Dioxane",
        "b": "/daɪˈɒkseɪn/"
      },
      {
        "a": "Diethyl Ether",
        "b": "/daɪˈɛθəl ˈiːθər/"
      },
      {
        "a": "Propyl Alcohol",
        "b": "/ˈproʊpəl ˈælkəhɒl/"
      },
      {
        "a": "Lauric Acid",
        "b": "/ˈlɔːrɪk ˈæsɪd/"
      },
      {
        "a": "Adipic Acid",
        "b": "/əˈdɪpɪk ˈæsɪd/"
      },
      {
        "a": "Terephthalic Acid",
        "b": "/ˌtɛrəfˈθælɪk ˈæsɪd/"
      },
      {
        "a": "Maleic Anhydride",
        "b": "/məˈliːɪk ænˈhaɪdraɪd/"
      },
      {
        "a": "Phthalic Anhydride",
        "b": "/ˈθælɪk ænˈhaɪdraɪd/"
      },
      {
        "a": "Methyl Ethyl Ketone (MEK)",
        "b": "/ˈmɛθəl ˈɛθəl ˈkiːtoʊn/"
      },
      {
        "a": "Lactic Acid",
        "b": "/ˈlæktɪk ˈæsɪd/"
      },
      {
        "a": "Citric Acid",
        "b": "/ˈsɪtrɪk ˈæsɪd/"
      },
      {
        "a": "Sucrose",
        "b": "/ˈsuːkroʊs/"
      },
      {
        "a": "Glucose",
        "b": "/ˈɡluːkoʊs/"
      },
      {
        "a": "Fructose",
        "b": "/ˈfruːktoʊs/"
      },
      {
        "a": "Amino Acid",
        "b": "/əˈmiːnoʊ ˈæsɪd/"
      },
      {
        "a": "Protein",
        "b": "/ˈproʊtiːn/"
      },
      {
        "a": "Cellulose",
        "b": "/ˈsɛljəˌloʊs/"
      },
      {
        "a": "Lipid",
        "b": "/ˈlɪpɪd/"
      },
      {
        "a": "Enzyme",
        "b": "/ˈɛnzaɪm/"
      }
    ]
  }
];
