import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { parseEther } from 'ethers/lib/utils';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, tenderly } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const apeMaster = await deploy('ApeMaster', {
    from: deployer,
    args: [parseEther('0.1'), deployer],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });

  await tenderly.verify({
    name: "ApeMaster",
    address: apeMaster.address,
  })
};
export default func;
func.tags = ['ApeMaster'];
